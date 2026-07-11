const express = require("express");

const router = express.Router();

const { reply } = require("../controllers/reply.controller");

router.post("/reply", reply);

module.exports = router;