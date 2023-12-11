const express = require("express")
const indexController = require("../Controller/user")
const profileController = require("../Controller/profile")
const upload = require("../multer")
const { isLoggedIn } = require("../passportConfig")
const router = express.Router()

router
.get("/" , indexController.profile)
.get("/allpins", profileController.allpins)
.get("/edit", profileController.editprofilePage)
.post("/edit", profileController.editprofile)
.get("/pin/:id", profileController.singlePost)
.post("/profileImage",  upload.single("profile"), profileController.updateProfile)
.get("/createPost" , profileController.createpost)
.get("/feed" , profileController.feed)
.post("/upload", upload.single('file'),  profileController.uploadFile)


module.exports = router