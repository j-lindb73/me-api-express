
var express = require('express');
var router = express.Router();


// Testing routes with method
router.get("/", (req, res, next) => {
    res.json({
        data: {
            msg: "Got a GET request, sending back default 200"
        }
    });
});

router.post("/", (req, res, next) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

router.put("/", (req, res, next) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

router.delete("/", (req, res, next) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});

module.exports = router; 