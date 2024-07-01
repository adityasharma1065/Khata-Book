require("dotenv").config()
const express = require("express");
const app = express();
const path = require("path");
const cookieParser= require("cookie-parser")
require("./config/mongoose-connect");

const flash=require("connect-flash")
const expressSession=require("express-session")

app.use(flash())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"shbvkdbvksxjbvbvzkjxb"
}))


let indexrouter = require("./routes/indexrouter");
let hisaabrouter=require("./routes/hisaab-router")

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/", indexrouter);
app.use("/hisaab",hisaabrouter)

app.listen(3000);
