const router = require("express").Router();
const categoryController = require("../app/controllers/CategoryController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.post("/add", verifyToken, verifyAdmin, categoryController.add);
router.delete("/delete/:id", verifyToken, verifyAdmin, categoryController.delete);
router.put("/edit/:id", verifyToken, verifyAdmin, categoryController.edit);
router.get("", categoryController.all);

module.exports = router;
