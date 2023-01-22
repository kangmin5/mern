const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminUpdateProduct,
  adminCreteProduct,
} = require("../controller/productController");

router.get("/category/:categoryName", getProducts);

router.get("/", getProducts);

router.get("/bestsellers", getBestsellers);

router.get("/get-one/:id", getProductById);

//admin routes:

router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin", adminCreteProduct);

module.exports = router;
