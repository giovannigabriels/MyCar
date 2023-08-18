const express = require("express");
const router = express.Router();
const Controller = require("../controllers/carController");
const authentication = require("../middleware/authentication");

router.get("/pub", Controller.index);
router.get("/:id", Controller.view);

// authentication
router.use(authentication);

router.get("/my-car", Controller.indexMyCar);
router.post("/", Controller.addCar);
router.put("/:carId", Controller.editCar);
router.delete('/:carId', Controller.delete)

module.exports = router;
