const express = require("express");
const { registerUser, authUser, allUsers, admin } = require("../controllers/userControllers");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect,allUsers);
router.post("/login", authUser);

router.get("/admin", admin);




module.exports = router
