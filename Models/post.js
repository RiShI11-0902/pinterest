const mongoose = require("mongoose")
const {Schema} = require("mongoose")
const post = new Schema({
    postText:{
        type: String,
        requierd: true
    },
    title:{
        type: String,
        requierd: true
    },
    image:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    likes:{
        type: Array,
        default: []
    }
})

exports.Post = mongoose.model("posts", post)