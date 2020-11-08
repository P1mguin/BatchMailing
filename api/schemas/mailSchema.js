'use strict';
var mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Enter a title for your email please"
    },
    subject: {
        type: String,
        required: "Enter a subject for your email please"
    },
    content: {
        type: String,
        required: "Please enter contents for your email"
    },
    variables: Array
})

module.exports = mongoose.model('Mail', mailSchema)