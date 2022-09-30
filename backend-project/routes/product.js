const router = require("express").Router();
const productController = require("../app/controllers/ProductController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const fileUpload = require("../middleware/file-upload");

router.post(
    "/add",
    verifyToken,
    verifyAdmin,
    fileUpload.single("img"),
    productController.addProduct
);
router.delete("/delete/:id", verifyToken, verifyAdmin, productController.deleteProduct);
router.put(
    "/edit/:id",
    verifyToken,
    verifyAdmin,
    fileUpload.single("img"),
    productController.editProduct
);
router.get("", productController.showAll);
router.get("/:id", productController.singleProduct);

module.exports = router;
