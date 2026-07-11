const express = require("express");

const router = express.Router();

const {
    pushContext
} = require("../controllers/context.controller");

router.post("/context", pushContext);

module.exports = router;