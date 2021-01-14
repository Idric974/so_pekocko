const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/Stuff");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, stuffCtrl.createSauces);
router.get("/", auth, stuffCtrl.getAllStuff);
router.get("/:id", auth, stuffCtrl.getOneSauces);
router.put("/:id", auth, multer, stuffCtrl.modifySauces);
router.delete("/:id", auth, stuffCtrl.deleteSauces);

module.exports = router;
