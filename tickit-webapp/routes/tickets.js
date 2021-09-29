const router         = require('express').Router();
const Tickets        = require('../models/tickets.model');
const TicketVariants = require('../models/ticketvariants.model');
const Events         = require('../models/events.model');
const auth           = require('../middleware/auth');

// get all tickets
router.route('/').get((req, res) => {
    Tickets.find()
           .then(tickets => res.json(tickets))
           .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Scans a ticket.
 */
router.route('/scan').post(auth, async (req, res) => {
    try {
        const {ticketId, eventId} = req.body;

        let ticket        = await Tickets.findById(ticketId);
        let ticketVariant = await TicketVariants.findById(ticket.ticketVariant);
        let ticketEvent   = await Events.findById(ticketVariant.event);

        if (ticketEvent.user != req.user) {
            res.json({
                ticket:        ticket,
                ticketVariant: ticketVariant,
                event:         ticketEvent,
                isValid:       false,
                message:       "Evenement is niet door dit profiel aangemaakt"
            });
        }

        if (ticketEvent._id != eventId) {
            res.json({
                ticket:        ticket,
                ticketVariant: ticketVariant,
                event:         ticketEvent,
                isValid:       false,
                message:       "Deze ticket behoort niet tot de door u geselecteerde evenement"
            });
        }

        if (ticket.validated) {
            res.json({
                ticket:        ticket,
                ticketVariant: ticketVariant,
                event:         ticketEvent,
                isValid:       false,
                message:       "Dubbele scan"
            });
        }

        ticket.validated = true;
        ticket.save();

        res.json({
            ticket:        ticket,
            ticketVariant: ticketVariant,
            event:         ticketEvent,
            isValid:       true,
            message:       "Success"
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;
