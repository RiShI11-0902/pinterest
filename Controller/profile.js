const {User} = require("../Models/users")
const {Post} = require("../Models/post")
const res = require("express/lib/response")
exports.feed = async (req,res)=>{
    const posts = await Post.find().populate("user")
    res.render("feed", {posts})
}

exports.createpost = (req,res)=>{
    res.render("createpost")
}

exports.uploadFile = async (req,res)=>{
    if(!req.file){
        return res.status(400).send("no file were uploaded")
    }
    const user = await User.findOne({username: req.user.username})
  const postData =  await Post.create({
        image: req.file.filename,
        postText: req.body.postText,
        title: req.body.title,
        user: user._id
    })
    user.posts.push(postData._id)
    await user.save()
   res.redirect("/profile")

}

exports.updateProfile = async (req,res)=>{
    // console.log("hello");
    let user = await User.findOne({username: req.user.username})
    user.profileImage = req.file.filename
    await user.save()
    res.redirect("/profile")
    console.log("user is"+user);
}

exports.allpins = async (req,res) =>{
    let user = await User.findOne({username: req.user.username}).populate("posts")
    // let posts = Post.find()
    // console.log(posts);
    res.render("allpins",{user})
}

exports.editprofile =  async (req,res)=>{
    let user = await User.findOne({username: req.user.username})
    user.tagline = req.body.tagline
    await user.save()
    res.redirect("/profile")
}

exports.editprofilePage = (req,res)=>{
    let user = req.user
    res.render("edit",{user})
}

exports.singlePost = async (req,res) =>{
    const postId = req.params.id
    let singlePost = await Post.findById(postId).populate("user")
    res.render("singlepost", {post: singlePost})
}