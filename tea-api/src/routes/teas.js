const express = require("express");
const router = express.Router();

const tea_controller = require("../controllers/TeaController");

router.get("/", tea_controller.index);

module.exports = router;