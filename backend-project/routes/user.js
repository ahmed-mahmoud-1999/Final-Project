const router = require("express").Router();
const userController = require("../app/controllers/UserController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.post("/registerAdmin", verifyToken, verifyAdmin, userController.createAdmin);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", verifyToken, verifyAdmin, userController.getUsers);
router.delete("/user/:id", verifyToken, verifyAdmin, userController.deleteUser);
router.get("/users/:id", verifyToken, verifyAdmin, userController.getSingle);
router.post("/logout", verifyToken, userController.logout);

module.exports = router;
