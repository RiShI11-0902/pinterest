const express = require("express")
const indexController = require("../Controller/user")
const router = express.Router()
const {isLoggedIn} = require("../passportConfig")
const passport = require("passport")
router
.post("/register", indexController.createUser)
.post("/login", passport.authenticate("local", { successRedirect:`/profile`,failureRedirect:"/login", failureFlash:true}))
.get("/" , indexController.homepage)
.get("/profile", isLoggedIn, indexController.profile)
.get("/login", indexController.loginpage)
.get("/logout", indexController.logout)

module.exports = router