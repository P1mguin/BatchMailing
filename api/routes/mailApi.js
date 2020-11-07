var express = require('express');
var router = express.Router();

// Get the mail
router.get('/', function(req, res) {
    res.send("API Working properly");
});

//

module.exports = router;
