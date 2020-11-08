var mongoose = require('mongoose'),
    Mail = mongoose.model('Mail');

exports.getTemplates = function (req, res) {
    Mail.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    })
}

exports.postTemplate = function (req, res) {
    console.log(req.body);
    let mail = new Mail(req.body);
    mail.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task)
    })
}