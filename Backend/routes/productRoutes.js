const express = require("express");
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductdetails, createProductReview, getProductReviews, deleteReview} = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,createProduct);
router.route("/admin/products/:id")
      .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
      .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
      
router.route("/products/:id").get(getProductdetails)

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);

module.exports=router