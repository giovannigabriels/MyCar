const express = require("express");
const router = express.Router();
const Controller = require("../controllers/carController");
const authentication = require("../middleware/authentication");
const {  authorization } = require("../middleware/authorization");

router.get("/pub", Controller.index);
router.get("/:id", Controller.view);

// authentication
router.use(authentication);

router.get("/my-car", Controller.indexMyCar);
router.post("/", Controller.addCar);
router.put("/:carId", authorization, Controller.editCar);
router.delete("/:carId",authorization, Controller.delete);

module.exports = router;
