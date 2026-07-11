const express = require("express");
const router = express.Router();

const {
    getMetadata
} = require("../controllers/metadata.controller");

router.get("/metadata", getMetadata);

module.exports = router;