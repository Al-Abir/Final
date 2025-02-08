const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true }) // This adds createdAt and updatedAt fields automatically

const Blog = mongoose.model('blogs', blogSchema)

module.exports = Blog
