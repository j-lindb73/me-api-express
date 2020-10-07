
var express = require('express');
var router = express.Router();

const chat = require('../models/chat.js');
const dsn =  "mongodb://localhost:27017/chat";
// const dsn =  "mongodb://me-api.hasselstigen.me:27017/chat";

router.get("/", async (req, res) => {
    try {
        let response = await chat.findInCollection(dsn, "posts", {}, {}, 0);

        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    // console.log(req.body);
    try {
        let response = await chat.insertCollection(dsn, "posts", req.body);

        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
