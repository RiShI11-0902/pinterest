const passport = require('passport')
const localStategy = require('passport-local')
const {User} = require("./Models/users")
exports.initializingPassport = (passport)=>{
    passport.use(new localStategy(async (username,password,next,req)=>{
       try {
        const user = await User.findOne({username})
        if (!user) return next(null,false,{message: "username incorrect"}) 
        if (password !== user.password) return next(null,false,{message: "password incorrect"}) 
        return next(null,user)
       } catch (error) {
        console.log(error);
       }
    }))

    passport.serializeUser((user,next)=>{
        next(null,user.id)
    })

    passport.deserializeUser( async (id,next)=>{
        try {
            let user = await User.findById(id)
            return next(null,user)
        } catch (error) {
            next(error,false)
        }
    })
}

exports.isLoggedIn = (req,res,next)=>{
    if (req.user) {
        return next()
    }
    res.redirect("/login")
}