const router   = require('express').Router();
const mongoose = require('mongoose');
const multer   = require('multer');
const auth     = require('../middleware/auth');
const Events   = require('../models/events.model');
const moment   = require('moment');


/**
 * Event read all
 */
router.route('/').get(auth, async (req, res) => {
    try {
        const event = await Events.find({
            user: new mongoose.Types.ObjectId(req.user)
        });

        res.json(event);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// /**
//  * Event sold tickets amount
//  */
// router.route('/report/sold').get(async (req, res) => {
//     try {
//
//         const soldEvents = await Events.aggregate([{
//             $lookup: {
//                 from: 'ticketvariants',
//                 localField: '_id',
//                 foreignField: 'event',
//                 as: 'ticketvariants'
//             }
//         }, {
//             $unwind: {
//                 path: "$ticketvariants",
//                 preserveNullAndEmptyArrays: true
//             }
//         }, {
//             $lookup: {
//                 from: 'tickets',
//                 localField: 'tickitvariants._id',
//                 foreignField: 'ticketVariant',
//                 as: 'tickets'
//             }
//         }]);
//
//         console.log(soldEvents);
//
//         res.json(soldEvents);
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// });




/**
 * Event read active
 */
router.route('/active').get(auth, async (req, res) => {
    try {

        const event = await Events.find({
            user:     new mongoose.Types.ObjectId(req.user),
            eventEnd: {$gte: moment().toDate()}
        });

        res.json(event);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Event read inactive
 */
router.route('/inactive').get(auth, async (req, res) => {
    try {

        const event = await Events.find({
            user:     new mongoose.Types.ObjectId(req.user),
            eventEnd: {$lte: moment().toDate()}
        });

        res.json(event);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Get event
 */
router.route('/:id').get(async (req, res) => {
    try {

        Events.aggregate([
            {
                $match:
                    {
                        _id: new mongoose.Types.ObjectId(req.params.id),
                    }
            },
            {
                $lookup:
                    {
                        from:         "ticketvariants",
                        localField:   "_id",
                        foreignField: "event",
                        as:           "ticketVariants"
                    }
            }
        ])
              .then(event => res.json(event))
              .catch(err => res.status(400).json('Error: ' + err));

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Update event
 */
router.route('/update/:id').post(auth, async (req, res) => {
    try {
        let {eventName, eventStart, eventEnd, eventLocation, eventAge} = req.body;

        const event = await Events.findById(req.params.id);

        event.eventName     = eventName || event.eventName;
        event.eventStart    = eventStart || event.eventStart;
        event.eventEnd      = eventEnd || event.eventEnd;
        event.eventLocation = eventLocation || event.eventLocation;
        event.eventAge      = eventAge || event.eventAge;
        event.user          = req.user;

        const savedEvent = await event.save();

        res.json(savedEvent);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Add event
 */
router.route('/add').post(auth, async (req, res) => {
    try {
        let {eventName, eventStart, eventEnd, eventLocation, eventAge} = req.body;
        let user                                                       = req.user;

        const newEvent = new Events({eventName, eventStart, eventEnd, eventLocation, eventAge, user});

        const savedEvent = await newEvent.save();

        res.json(savedEvent);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Delete an event
 */
router.route('/:id').delete(auth, async (req, res) => {
    try {
        const deletedEvent = await Events.findByIdAndDelete(req.params.id);
        res.json(deletedEvent);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * Uploads event image
 */
router.route('/upload').post(auth, async (req, res) => {
    try {
        const imageDirectory = 'public/uploads/events';
        const imageFileName  = req.query.eventId + ".jpeg";
        const event          = await Events.findById(req.query.eventId);

        event.eventImage = "/uploads/events/" + req.query.eventId + ".jpeg";

        const savedEvent = await event.save();

        // Upload the file to directory
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, imageDirectory)
            },
            filename:    function (req, file, cb) {
                cb(null, imageFileName);
            }
        });

        const upload = multer({storage: storage}).single('file');

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file)
        });


    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
