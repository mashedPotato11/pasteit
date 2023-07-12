const express = require("express");
const { createPaste, getPaste } = require("../controllers/pasteControllers");

const router = express.Router();

router.route("/").post(createPaste);
router.route("/:pasteString/:passwordString").get(getPaste);

module.exports = router;
