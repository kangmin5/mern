const recordsPerPage = require("../config/pagination");
const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
    try {

        let query = {}
        let queryCondition = false

        let proiceQueryCondition ={}
        if (req.query.price) {
            queryCondition = true
            proiceQueryCondition = { price: { $lte: Number(req.query.price)}}
        }

        let ratingQueryCondition = {}
        if (req.query.rating) {
            queryCondition = true
            ratingQueryCondition = { rating: { $in: req.query.rating.split(',')}}
        }
        
        if (queryCondition) {
            query = {
                $and: [proiceQueryCondition, ratingQueryCondition]
            }
        }

      
    // Pagination    
    const pageNum = Number(req.query.pageNum) || 1;
    
    //sort by name, price etc...
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
        let sortOpt = sortOption.split("_");
        sort = { [sortOpt[0]]: Number(sortOpt[1]) };
        console.log(sort);
    }
    
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);
    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getProducts;
