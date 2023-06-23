const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/UserController");

router.get("/", user_controller.index);

router.get("/userlist", user_controller.user_list);

router.post("/create", user_controller.new_user);

module.exports = router;