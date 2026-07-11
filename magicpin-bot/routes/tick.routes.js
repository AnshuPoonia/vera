const express = require("express");

const router = express.Router();

const { tick } = require("../controllers/tick.controller");

router.post("/tick", tick);

module.exports = router;