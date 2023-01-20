const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "default category description" },
    image: { type: String, default: "/images/tabless-category.png"},
    attrs: [{ key: { type: String }, value:[{type: String}] }]
})

//카테고리 Ascending 검색
categorySchema.index({description: 1})

const Category = mongoose.model('category',categorySchema)
module.exports = Category