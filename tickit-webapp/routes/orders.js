const router               = require('express').Router();
const auth                 = require('../middleware/auth');
const {createMollieClient} = require('@mollie/api-client');
const mollieClient         = createMollieClient({apiKey: process.env.MOLLIE_KEY});
const sgMail               = require('@sendgrid/mail').setApiKey(process.env.SENDGRID_API_KEY);
const pdf                  = require('html-pdf');
const mongoose             = require('mongoose');
var QRCode                 = require('qrcode');

const ticketTemplate = require('../templates/documents/ticket');
const orderTemplate  = require('../templates/mail/order');

let Orders         = require('../models/orders.model');
let Events         = require('../models/events.model');
let TicketVariants = require('../models/ticketvariants.model');
let Tickets        = require('../models/tickets.model');


require('dotenv').config();

/** Statistics **/

/**
 * Daily report of orders
 */
router.route('/report/daily').get(auth, async (req, res) => {
    try {
        const orders = await Orders.aggregate(
            [
                // Join with user_role table
                {
                    $lookup: {
                        from:         "events",
                        localField:   "eventId",
                        foreignField: "_id",
                        as:           "order_event"
                    }
                },
                {
                    $unwind: "$order_event"
                },
                {
                    /* Filter out users who have not yet paid their order */
                    $match: {
                        /* isPaid is an boolean field */
                        'isPaid':           true,
                        'order_event.user': new mongoose.Types.ObjectId(req.user)

                    }
                },
                {
                    /* group by year and month of the placed order */
                    $group: {
                        _id:      {
                            year:  {
                                $year: '$createdAt'
                            },
                            month: {
                                $month: '$createdAt'
                            },
                            day:   {
                                $dayOfMonth: '$createdAt'
                            }
                        },
                        subtotal: {
                            $sum: {$round: ["$subTotal", 2]}
                        },
                        total:    {$sum: {$round: ["$total", 2]}},
                        orders:   {$sum: 1}
                    }
                },
                {
                    /* sort descending (latest orders first) */
                    $sort: {
                        '_id.year':  -1,
                        '_id.month': -1,
                        '_id.day':   -1
                    }
                },
                {
                    $limit: 100,
                },
            ]
        );

        console.log(orders);

        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Monthly Report of orders
 */
router.route('/report/monthly').get(auth, async (req, res) => {
    try {
        const orders = await Orders.aggregate(
            [
                // Join with user_role table
                {
                    $lookup: {
                        from:         "events",
                        localField:   "eventId",
                        foreignField: "_id",
                        as:           "order_event"
                    }
                },
                {
                    $unwind: "$order_event"
                },
                {
                    /* Filter out users who have not yet paid their order */
                    $match: {
                        /* isPaid is an boolean field */
                        'isPaid':           true,
                        'order_event.user': new mongoose.Types.ObjectId(req.user)

                    }
                },
                {
                    /* group by year and month of the placed order */
                    $group: {
                        _id:      {
                            year:  {
                                $year: '$createdAt'
                            },
                            month: {
                                $month: '$createdAt'
                            }
                        },
                        subtotal: {
                            $sum: {$round: ["$subTotal", 2]}
                        },
                        total:    {$sum: {$round: ["$total", 2]}},
                        orders:   {$sum: 1}
                    }
                },
                {
                    /* sort descending (latest orders first) */
                    $sort: {
                        '_id.year':  -1,
                        '_id.month': -1
                    }
                },
                {
                    $limit: 100,
                },
            ]
        );

        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Yearly report of orders
 */
router.route('/report/yearly').get(auth, async (req, res) => {
    try {
        const orders = await Orders.aggregate(
            [
                // Join with user_role table
                {
                    $lookup: {
                        from:         "events",
                        localField:   "eventId",
                        foreignField: "_id",
                        as:           "order_event"
                    }
                },
                {
                    $unwind: "$order_event"
                },
                {
                    /* Filter out users who have not yet paid their order */
                    $match: {
                        /* isPaid is an boolean field */
                        'isPaid':           true,
                        'order_event.user': new mongoose.Types.ObjectId(req.user)

                    }
                },
                {
                    /* group by year  of the placed order */
                    $group: {
                        _id:      {
                            year: {
                                $year: '$createdAt'
                            }
                        },
                        subtotal: {
                            $sum: {$round: ["$subTotal", 2]}
                        },
                        total:    {$sum: {$round: ["$total", 2]}},
                        orders:   {$sum: 1}

                    }
                },
                {
                    /* sort descending (latest orders first) */
                    $sort: {
                        '_id.year': -1
                    }
                },
                {
                    $limit: 100,
                },
            ]
        );

        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Creates a payment URL
 */
router.route('/checkout/:id').get(async (req, res) => {
    try {

        const order = await Orders.findById(req.params.id);

        const payment = await mollieClient.payments.create({
            amount:      {
                value:    parseFloat(order.total).toFixed(2),
                currency: 'EUR'
            },
            description: 'TICKIT TICKETS',
            redirectUrl: 'https://tickit.vorm.tech/shop/confirmation/' + req.params.id,
            webhookUrl:  'https://tickit.vorm.tech/orders/webhook',
            metadata:    req.params.id
        });

        order.paymentId = payment.id;
        order.save();

        res.json(payment.getPaymentUrl())
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Webhook after payment
 */
router.route('/webhook').post(async (req, res) => {
    try {
        const payment = await mollieClient.payments.get(req.body.id, {
            embed: 'chargebacks' // <- Please note the `embed` option
        });

        // Get order with the order ID from the payment metadata
        const order = await Orders.findById(payment.metadata);

        if (payment.isPaid()) { // Payment has become "paid". Mark payment as paid internally and send order confirmation to consumer. Send consumer to order confirmation page when it reaces your `redirectUrl`

            // Change order isPaid field to true
            order.isPaid = payment.isPaid();
            order.save();

            // Array of ticket attachments to be send in the mail
            let ticketAttachments = await Promise.all(order.products.map(async (product) => {
                let pdfHTML = "";

                // Create new tickets in the database based on the order.
                for (let index = 0; index < product.quantity; index++) {

                    console.log(product);

                    const newTicket = new Tickets({
                        validated:     false,
                        ticketVariant: product.ticketVariant._id,
                        order:         order._id
                    });

                    const ticketEvent   = await Events.findById(product.ticketVariant.event);
                    const ticketVariant = await TicketVariants.findById(product.ticketVariant._id);


                    const savedTicket = await newTicket.save();
                    const QRCodeURL   = await QRCode.toDataURL(savedTicket.id);

                    pdfHTML += ticketTemplate(order, ticketEvent, ticketVariant, QRCodeURL);
                }

                return pdfHTML;
            }));

            // Generate PDF documents
            pdf.create(ticketAttachments.join(""), {}).toBuffer(function (err, buffer) {
                if (err) {
                    return res.send(Promise.reject())
                }

                // Use Send grid API to mail the tickets to the end user.
                sgMail.send({
                    to:          order.email, // Change to your recipient
                    from:        'info@vorm.tech', // Change to your verified sender
                    subject:     'Uw Tickets',
                    html:        orderTemplate(order),
                    attachments: [{
                        content:     new Buffer.from(buffer).toString("base64"),
                        filename:    "tickets.pdf",
                        type:        "application/pdf",
                        disposition: "attachment"
                    }]
                });
            });

            res.json(order);
        }

        if (payment.isAuthorized()) { // Payment is authorized. send order confirmation to consumer. Send consumer to order confirmation page when it reaces your `redirectUrl`
            res.json(false);
        }

        if (payment.isFailed() || payment.isExpired() || payment.isCanceled()) { // Payment is expired / failed / canceled. Make sure the consumer is sent back to checkout page when it reaches your `redirectUrl`.
            res.json(false);
        }

    } catch
        (err) {
        res.status(500).json({error: err.message});
    }
});


/**
 * Get payment data
 */
router.route('/payments/:id').get(auth, async (req, res) => {
    try {
        let payment = await mollieClient.payments.get(req.params.id);

        res.json(payment);
    } catch (e) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Get all payments
 */
router.route('/payments').get(auth, async (req, res) => {
    try {
        let payment = await mollieClient.payments.list();

        res.json(payment);
    } catch (e) {
        res.status(500).json({error: err.message});
    }
});


/**
 * Get all orders.
 */
router.route('/').get(auth, async (req, res) => {
    try {
        let orders = await Orders.find(req.params.id);

        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Get all orders of an selected event.
 */
router.route('/event/:id').get(auth, async (req, res) => {
    try {
        let orders = await Orders.find({eventId: req.params.id});

        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Get all orders of an selected user.
 */
router.route('/user/').get(auth, async (req, res) => {
    try {

        let events = await Events.find({user: req.user}).select('_id');

        let queryBody = [];

        for (i = 0; i < events.length; i++) {
            let body = {eventId: events[i]._id};
            queryBody.push(body)
        }

        let orders = await Orders.find({$and: [{$or: queryBody}, {isPaid: true}]}).sort({createdAt: -1});

        res.json(orders);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


/**
 * Get a single order.
 */
router.route('/:id').get(async (req, res) => {
    try {
        let order = await Orders.findById(req.params.id);

        res.json(order);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


/**
 * Add an order
 */
router.route('/add').post(async (req, res) => {
    try {
        let {email, firstName, lastName, products, subTotal, total, isPaid, userId, eventId} = req.body;

        const newOrder   = new Orders({email, firstName, lastName, products, subTotal, total, isPaid, userId, eventId});
        const savedOrder = await newOrder.save();

        res.json(savedOrder);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


/**
 * Update an order
 */
router.route('/update/:id').post(async (req, res) => {
    try {
        let {email, firstName, lastName, products, subTotal, total, isPaid, eventId, paymentId} = req.body;

        const order = await Orders.findById(req.params.id);

        order.firstName = firstName || order.firstName;
        order.lastName  = lastName || order.lastName;
        order.email     = email || order.email;
        order.products  = products || order.products;
        order.subTotal  = subTotal || order.subTotal;
        order.total     = total || order.total;
        order.isPaid    = isPaid || order.isPaid;
        order.eventId   = eventId || order.eventId;
        order.paymentId = paymentId || order.paymentId;


        const savedOrder = await order.save();

        res.json(savedOrder);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;
