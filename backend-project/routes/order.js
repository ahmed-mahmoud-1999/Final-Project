const router = require("express").Router();
const orderController = require("../app/controllers/OrderController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/add", verifyToken, orderController.addOrder);
router.get("", verifyToken, orderController.getAllOrders);
router.get("/user/:id", verifyToken, verifyAdmin, orderController.getUserOrders);
router.put("/user/:userId/:orderId", verifyToken, verifyAdmin, orderController.editOrder);

module.exports = router;
