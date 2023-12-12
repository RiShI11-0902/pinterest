const express = require("express");
// const userModel = require("../Models/users")
const mongoose = require("mongoose");
const { User } = require("../Models/users");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db connected");
}

exports.homepage = (req, res) => {
  res.render("index",{msg: req.flash("msg")});
};

exports.createUser = async (req, res, next) => {
  try {
    
    // console.log(req.body.email);

    let exits = await User.findOne({username: req.body.username})
    let email = await User.findOne({email: req.body.email})

    if (exits || email) {
      req.flash("msg","username or email already exits")
      // res.json({error: ""})
      res.redirect("/")
    }

    let user = new User();
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    const doc = await user.save();
    
    // res.send(doc)

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("msg","successs")
      return res.redirect("/profile"); //+ req.user.username
    });

  } catch (error) {
    
    console.log(error);
  }
};

exports.profile = async (req,res)=>{
  const user = await User.findOne({_id: req.user}).populate("posts") // req.session.passport ( use findOne ) this will store the whole user object //.populate("posts")
  console.log(user);
    res.render("profile", {user})
  
}

exports.loginpage = function(req,res){
  res.render("login", {error: req.flash("error")})
}

exports.logout = (req,res,next)=>{
  req.logout(req.user, (err)=>{
    if (err) {
      return next(err)
    }
    return res.redirect("/login")
  })
}
