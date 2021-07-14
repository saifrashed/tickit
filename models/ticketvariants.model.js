const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Ticket variants schema
const TicketVariantsSchema = new Schema({
    description:   {
        type:     String,
        required: [true, "can't be blank"],
        index:    true
    },
    price:         {
        type:     Number,
        required: [true, "can't be blank"],
    },
    availability:  {
        type:    Boolean,
        default: true,
    },
    personsAmount: {
        type:     Number,
        required: [true, "can't be blank"],
    },
    event:         {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Events'
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('TicketVariants', TicketVariantsSchema);
