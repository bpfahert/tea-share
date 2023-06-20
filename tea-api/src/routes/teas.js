const express = require("express");
const router = express.Router();

const tea_controller = require("../controllers/TeaController");

router.get("/", tea_controller.index);

router.post("/create", tea_controller.tea_create_post);

module.exports = router;