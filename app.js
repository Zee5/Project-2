//dependencies
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose"); 
const passport      = require("passport");
const LocalStrategy = require("passport-local");
const Place         = require("./models/place");
const Comment       = require("./models/comment");
const User           = require("./models/user");
const seedDB        = require("./seeds");

//reqire routes
const  commentRoutes    = require("./routes/comments");
const  placeRoutes      = require("./routes/places");
const  indexRoutes      = require("./routes/index");

//connection setup
mongoose.connect("mongodb://localhost/skydive_db");
//tell the app to use the following packages
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3003);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
//passport configuration
app.use(require("express-session")({
    secret: "Top 10 Health Benefits of Skydiving",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/places", placeRoutes);
app.use("/places/:id/comments", commentRoutes);

//listen at port 3003 and console log the message
app.listen(app.get("port"), () => {
   console.log("The Share Skydiving experience server is running at port 3003 .......")
})