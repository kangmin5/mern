const recordsPerPage = require("../config/pagination");
const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    // get Products by category (searchBar 방식 (직접URL에 입력))
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }

    // get Products by category (쿼리 params에서 가져오기)
    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = { category: { $in: a } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
        ],
      };
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

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $replaceWith: "$doc_with_max_sales" },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, image: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");

    return res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: "Product removed successfully" });
  } catch (err) {
    next(err);
  }
};

const adminCreteProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, category, count, price, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.category = category;
    product.count = count;
    product.price = price;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();
    res.json({
      message: "Product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, category, count, price, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.count = count || product.count;
    product.price = price || product.price;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
      
    await product.save();
    res.json({ message: "Product Updated" });
      
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreteProduct,
  adminUpdateProduct,
};
