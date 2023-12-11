const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    tagline:{
        type:String,
        default: ""
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }]
    
})

exports.User = mongoose.model("user", userSchema)

