const router   = require('express').Router();
const Tickets = require('../models/tickets.model');

// get all tickets
router.route('/').get((req, res) => {
    Tickets.find()
           .then(tickets => res.json(tickets))
           .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
