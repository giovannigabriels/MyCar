const express = require("express");
const router = express.Router();
const Controller = require("../controllers/carCommentController");
const authentication = require("../middleware/authentication");

router.get("/:idCar", Controller.indexByCarId);

// authentication
router.use(authentication);

router.post("/", Controller.addComment);


module.exports = router;
