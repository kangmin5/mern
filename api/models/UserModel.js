const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , default: false },
    phoneNumber: { type: String, },
    address: { type: String, },
    country: { type: String },
    zipCode: { type: String },
    city: { type: String },
    isAdmin: { type: Boolean, required: true, default: false},
}, {
    timestamps:true,
})

const User = mongoose.model('user', userSchema)
module.exports = User