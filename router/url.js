const express = require("express");
const { handleNewShortURL, handelanalytics } = require("../controller/url");
const router = express.Router();

router.post("/", handleNewShortURL);

router.get("/analytics/:shortId", handelanalytics);
module.exports = router;
