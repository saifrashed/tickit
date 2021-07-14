const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Orders schema
const OrdersSchema = new Schema({
    email:     {
        type:      String,
        lowercase: true,
        required:  false,
        match:     [/\S+@\S+\.\S+/, 'is invalid'],
        index:     true
    },
    firstName: {
        type:      String,
        lowercase: true,
        required:  false
    },
    lastName:  {
        type:      String,
        lowercase: true,
        required:  false
    },
    products:  {
        type:     Array,
        required: [true, "Cant be blank"],
    },
    subTotal:  {
        type:     mongoose.Decimal128,
        required: [true, "Cant be blank"],
    },
    total:     {
        type:     mongoose.Decimal128,
        required: [true, "Cant be blank"],
    },
    isPaid:    {
        type:         Boolean,
        defaultValue: true
    },
    eventId:   {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Events'
    },
    userId:    {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Users'
    },
    paymentId: {
        type:     String,
        required: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Orders', OrdersSchema);
