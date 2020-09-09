
var express = require('express');
var router = express.Router();

const db = require('../db/database');
const auth = require('../models/auth');
const bcrypt = require('bcryptjs');


// Testing routes with method
router.get("/", (req, res, next) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.post("/", (req, res, next) => {
    auth.register(res, req.body);
});


router.post("/old", (req, res, next) => {

    let sql = "INSERT INTO users (email, password) VALUES (?, ?);";

    db.run(sql, req.body.email, req.body.password, function(err) {

        if (err) {
            return res.status(500).json({
                errors: {
                status: 500,
                source: "POST /user",
                title: "Database error",
                detail: err.message
                    }
                })
        }

        res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201 Created"
            }
        });
    })
});

router.put("/", (req, res, next) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

router.delete("/", (req, res, next) => {
    let sql = "DELETE FROM users WHERE email = ?;";

    db.run(sql, req.body.email, function(err) {

        if (err) {
            return res.status(500).json({
                errors: {
                status: 500,
                source: "POST /user",
                title: "Database error",
                detail: err.message
                    }
                })
        }
    // DELETE requests should return 204 No Content
    res.status(204).send();
    });
});

module.exports = router; 

