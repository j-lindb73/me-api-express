
var express = require('express');
var router = express.Router();

const db = require('../db/database');
const auth = require('../models/auth');


// Testing routes with method
router.get("/", (req, res, next) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.post("/", (req, res, next) => {
    auth.login(res, req.body);
});

router.post("/old", (req, res, next) => {

    let sql = "SELECT * FROM users WHERE email = ?;";

    db.get(sql, req.body.email, function(err, rows) {
        console.log("Rows kommer här: ");
        console.log(rows);
        if (rows === undefined) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "POST /login",
                    title: "Database error",
                    detail: "User not found"
                    }
                })
        }

        if (req.body.password === rows.password) {

            return res.status(200).json({
                data: {
                    msg: "Got a POST request, sending back default 200"
                }
            })
        }

        return res.status(401).json({
            errors: {
                status: 401,
                source: "/login",
                title: "Wrong password",
                detail: "Password is incorrect."
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


