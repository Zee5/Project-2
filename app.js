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


// Landing page
app.get("/", (req, res) => {
    res.render("landing")
})
//
app.get("/places", (req, res) => {
    // get all places from skydive_db database and that file
    Place.find({}, (err, allPlaces) =>{
        if(err){
            console.log(err);
        }else{
            res.render("places/index", {places:allPlaces})
        }
    })
    
});
// Create route- to add new skydiving places to a db
app.post("/places", (req, res ) => {
    //get data from form and add to places array
    var name  =  req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newPlace = {name: name, image: image, description: desc};
    // Create a new place or skydiving location and save to the sb
   Place.create(newPlace, (err, newlyCreatedPlace) => {
       if(err){
        console.log(err);
       }else{
        res.redirect("/places");
       }

   });
});
// Show the form that will send the data to /places post route
app.get("/places/new", (req, res) => {
    res.render("places/new");

});

//Show - show more info about specific skydive place
app.get("/places/:id", function(req,res)  {
    //find the places with the mongoose provided id
    Place.findById(req.params.id).populate("comments").exec(function(err, foundPlace){
        if(err){
            console.log(err);
        }else{
            console.log(foundPlace)
            //render show tempalte with that place
             res.render("places/show", {place: foundPlace});
        }
    });
})

//============================================
// Comment Routes
//==========================================
app.get("/places/:id/comments/new",isLoggedIn, function(req, res){
    // find places by id
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {place: place});
        }
    })
});

app.post("/places/:id/comments",isLoggedIn, function(req, res){
    //lookup place using id
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
            res.redirect("/places");
        } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                place.comments.push(comment);
                place.save();
                res.redirect('/places/' + place._id);
            }
         });
        }
    });

});

// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
    res.render("register"); 
 });
 //handle sign up logic
 app.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("register");
         }
         passport.authenticate("local")(req, res, function(){
            res.redirect("/places"); 
         });
     });
 });
 
 // show login form
 app.get("/login", function(req, res){
    res.render("login"); 
 });
 // handling login logic
 app.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/places",
         failureRedirect: "/login"
     }), function(req, res){
 });
 
 // logout logic route
 app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/places");
 });
 
 //middleware
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }


//listen at port 3003 and console log the message
app.listen(app.get("port"), () => {
   console.log("The Share Skydiving experience server is running at port 3003 .......")
})