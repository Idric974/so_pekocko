const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/Stuff");

router.get("/", stuffCtrl.getAllStuff);
router.post("/", stuffCtrl.createSauces);
router.get("/:id", stuffCtrl.getOneSauces);
router.put("/:id", stuffCtrl.modifySauces);
router.delete("/:id", stuffCtrl.deleteSauces);

module.exports = router;
