const Category = require("../models/CategoryModel")

const getCategories = async(req, res,next) => {

    try {
        const categories = await Category.find({}).sort({ name: "asc" }).orFail()
        res.json(categories)
    } catch (err) {
        next(err)
    }
}

module.exports = getCategories;