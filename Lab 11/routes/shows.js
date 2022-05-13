const express = require("express");
const router = express.Router();
// const axios = require("axios");
// const showsData = require("../data/shows");
// const userApiData = userApi.user;
const path = require("path");

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/shows.html"));    
});


module.exports = router;

