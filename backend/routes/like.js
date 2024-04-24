const express = require("express");
const { likeAdd, likeDelete } = require("../controllers/likeController");
const { verifyUser } = require("../middleware");

const router = express.Router();

router.post("/", verifyUser, likeAdd);
router.delete("/", verifyUser, likeDelete);

module.exports = router;
