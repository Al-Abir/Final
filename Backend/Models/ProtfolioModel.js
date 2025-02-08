const mongoose = require('mongoose');

const IntroSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// About Schema
const AboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
});

module.exports = {
    Intro: mongoose.model('intros', IntroSchema),
    About: mongoose.model('abouts', AboutSchema),
};
