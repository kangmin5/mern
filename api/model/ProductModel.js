const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required :true,
    }
})
module.exports = Product = mongoose.model('pruduct', productSchema)