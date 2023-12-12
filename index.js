require('dotenv').config() 
const express = require("express")
const path = require("path")
const app = express()
const ejs = require("ejs")
const morgan = require("morgan")
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const {initializingPassport, isLoggedIn} = require("./passportConfig")



//setup ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "Pinterest"
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

initializingPassport(passport)


app.use(morgan('dev'))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))) // for getting the files in the public folder
app.use(express.json())
app.use(express.urlencoded({extended: true})) // this helps to accept the data from the input boxes


const indexRouter = require("./Routes/index")
const profileRouter = require("./Routes/profileRouter")
// const profileRouter = require("./Routes/profileRouter")
app.use("/", indexRouter )
app.use("/profile", isLoggedIn, profileRouter)

console.log(process.env.PORT);
console.log(process.env.MONGO_URL);

app.listen( process.env.PORT || "8000")