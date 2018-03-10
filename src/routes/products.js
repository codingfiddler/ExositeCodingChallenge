var express = require('express');
var router = express.Router();

/* Return a list of all products */
router.get('/', function(req, res, next) {
    res.sendStatus(200);
});

module.exports = router;
