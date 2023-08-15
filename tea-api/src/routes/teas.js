const express = require("express");
const router = express.Router();

const tea_controller = require("../controllers/TeaController");
const user_controller = require("../controllers/UserController");

router.post("/recommend", tea_controller.tea_recommend_post);

router.post("/removerec/:id", tea_controller.tea_recommend_delete);

router.get("/all", tea_controller.get_all_teas);

router.get("/recent", tea_controller.get_new_teas);

router.get("/:id", tea_controller.index);

router.post("/create", tea_controller.tea_create_post);

router.post("/favorite/:id", tea_controller.tea_favorite_post);

router.post("/unfavorite/:id", tea_controller.tea_favorite_delete);

router.post("/save/:id", tea_controller.tea_save_post);

router.post("/unsave/:id", tea_controller.tea_saved_delete);

router.post("/delete/:id", tea_controller.tea_delete_post);

router.post("/update/:id", tea_controller.tea_update_post);

module.exports = router;