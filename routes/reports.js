var express = require('express');
var router = express.Router();

// const data = require('../models/texts');
const texts = require('../models/texts');
const db = require('../db/database');

router.get('/week/:kmom', function(req, res) {

    let sql = `SELECT week, text FROM reports WHERE week = ?;`;

    db.each(sql, req.params.kmom, function(err, row) {
        console.log(row.week + ": " + row.text);
       
        const data = {
            data: {
                week: row.week,
                text: row.text
            }
        };
        console.log(data);
        res.json(data);
    });
});

router.post('week/:kmom')



module.exports = router; 