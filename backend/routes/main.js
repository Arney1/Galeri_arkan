const express = require("express");
const { home, foto, profile, search } = require("../controllers/mainController");

const router = express.Router();

router.post("/", home);
router.post("/foto", foto);
router.post("/profile", profile);
router.post("/search", search);

module.exports = router;