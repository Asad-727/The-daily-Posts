const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    like: {
        type: Number,
        default: 0
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;