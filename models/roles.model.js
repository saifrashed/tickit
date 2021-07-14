const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Roles schema
const RolesSchema = new Schema({
    description: {
        type:      String,
        lowercase: true,
        required:  [true, "can't be blank"],
        match:     [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index:     true
    },
});

module.exports = mongoose.model('Roles', RolesSchema);
