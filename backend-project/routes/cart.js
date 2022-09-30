const router = require("express").Router();
const CartController = require("../app/controllers/CartController");
const verifyToken = require("../middleware/verifyToken");

router.post("/add", verifyToken, CartController.addproduct);
router.put("/edit", verifyToken, CartController.editCart);
router.get("", verifyToken, CartController.getCart);

module.exports = router;
