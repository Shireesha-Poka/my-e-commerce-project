const express = require("express");
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, DeleteOrder } = require("../controllers/orderContoller");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);

router.route("/admin/allorders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id")
      .put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus)
      .delete(isAuthenticatedUser,authorizeRoles("admin"),DeleteOrder);

module.exports = router ;