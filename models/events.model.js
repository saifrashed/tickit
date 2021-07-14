const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Events schema
const EventsSchema = new Schema({
    eventName:     {
        type:     String,
        required: [true, "can't be blank"],
        index:    true
    },
    eventStart:    {
        type:     Date,
        required: [true, "can't be blank"],
        index:    true
    },
    eventEnd:      {
        type:     Date,
        required: [true, "can't be blank"],
        index:    true
    },
    eventLocation: {
        type:     String,
        required: [true, "can't be blank"],
        index:    true
    },
    eventAge:      {
        type:     Number,
        required: [true, "can't be blank"],
        index:    true
    },
    eventImage:    {
        type:    String,
        default: "/uploads/events/placeholder.jpeg"
    },
    user:          {
        type:     mongoose.Schema.Types.ObjectId,
        required: [true, "can't be blank"],
        ref:      'Users'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Events', EventsSchema);
