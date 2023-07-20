const express = require("express");
const router = express.Router();

const tea_controller = require("../controllers/TeaController");
const user_controller = require("../controllers/UserController");

router.post("/recommend", tea_controller.tea_recommend_post);

router.get("/all", tea_controller.get_all_teas);

router.get("/:id", tea_controller.index);

router.post("/create", tea_controller.tea_create_post);

router.get("/favorite/:id", tea_controller.tea_favorite_get);

router.get("/save/:id", tea_controller.tea_save_get);

router.post("/delete/:id", tea_controller.tea_delete_post);

router.post("/update/:id", tea_controller.tea_update_post);

module.exports = router;