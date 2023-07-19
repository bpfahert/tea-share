const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/UserController");

router.get("/userlist", user_controller.user_list);

router.post("/create", user_controller.new_user);

router.get("/profile/:id", user_controller.get_user_info);

router.post("/verify", user_controller.userVerification);

module.exports = router;