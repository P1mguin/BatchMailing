var express = require("express");
var router = express.Router();
var mail = require('../components/mail');

// route is / because in app.js you already call this file with /mail
router.post("/", function(req, res, next){
    console.log("Mail Post")
    mail.postTemplate(req, res, next)
})

router.get("/", function(req, res){
    console.log("Mail Get")
    mail.getTemplates(req, res)
})

router.post("/send", function(req, res){
    console.log("Mail send")
    mail.sendMail(req, res);
})

module.exports = router;