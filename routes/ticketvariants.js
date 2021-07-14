const router   = require('express').Router();
const mongoose = require('mongoose');
const auth     = require('../middleware/auth');
const TicketVariants = require('../models/ticketvariants.model');

/**
 * Ticket variant reads
 */
router.route('/').get(async (req, res) => {
    TicketVariants.aggregate([
        {
            $lookup:
                {
                    from:         "events",
                    localField:   "event",
                    foreignField: "_id",
                    as:           "event"
                }
        }
    ])
                  .then(events => res.json(events))
                  .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Ticket variant read
 */
router.route('/:id').get(async (req, res) => {
    TicketVariants.aggregate([
        {
            $match:
                {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
        },
        {
            $lookup:
                {
                    from:         "events",
                    localField:   "event",
                    foreignField: "_id",
                    as:           "event"
                }
        }
    ])
                  .then(event => res.json(event))
                  .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Ticket variant add
 */
router.route('/add').post(auth, async (req, res) => {
    try {
        let {description, price, availability, personsAmount, event} = req.body;

        const newTicketVariant   = new TicketVariants({description, price, availability, personsAmount, event});
        const savedTicketVariant = await newTicketVariant.save();

        res.json(savedTicketVariant);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


/**
 * Ticket variant update
 */
router.route('/update/:id').post(auth, async (req, res) => {
    try {
        let {description, price, availability, personsAmount, event} = req.body;

        TicketVariants.findById(req.params.id)
                      .then((ticketVariant) => {
                          ticketVariant.description   = description || ticketVariant.description;
                          ticketVariant.price         = price || ticketVariant.price;
                          ticketVariant.availability  = availability || ticketVariant.availability;
                          ticketVariant.personsAmount = personsAmount || ticketVariant.personsAmount;
                          ticketVariant.event         = event || ticketVariant.event;

                          ticketVariant.save()
                                       .then(() => {
                                           res.json('Ticket variant updated!')
                                       })
                                       .catch(err => res.status(400).json('Error: ' + err))
                      })
                      .catch(err => {
                          res.status(400).json('Error: ' + err);
                      })
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Ticket variant delete
 */
router.route('/:id').delete(auth, async (req, res) => {
    try {
        const deletedTicketVariants = await TicketVariants.findByIdAndDelete(req.params.id);
        res.json(deletedTicketVariants);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Ticket variant sale toggle
 */
router.route('/toggle/:id').get(auth, async (req, res) => {
    try {
        const toggledTicketVariant = await TicketVariants.findById(req.params.id);

        toggledTicketVariant.availability = !toggledTicketVariant.availability;

        toggledTicketVariant.save();

        res.json(toggledTicketVariant);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;
