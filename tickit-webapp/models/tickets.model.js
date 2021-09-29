const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Ticket variants schema
const TicketsSchema = new Schema({
    validated:     {
        type:    Boolean,
        default: false
    },
    ticketVariant: {
        type:     mongoose.Schema.Types.ObjectId,
        required: [true, "can't be blank"],
        ref:      'TicketVariants'
    },

    event: {
        type:     mongoose.Schema.Types.ObjectId,
        required: [true, "can't be blank"],
        ref:      'Events'
    },
    order:         {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Orders'
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Tickets', TicketsSchema);
