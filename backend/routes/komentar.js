const express = require("express");
const { komentarAdd, komentarDelete, komentarUpdate } = require("../controllers/komentarController");
const { verifyUser } = require("../middleware");

const router = express.Router();

router.post("/", verifyUser, komentarAdd);
router.delete("/", verifyUser, komentarDelete);
router.patch("/", verifyUser, komentarUpdate);

module.exports = router;