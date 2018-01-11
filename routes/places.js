const express = require("express");
const router =  express.Router();
const Place  =  require("../models/place");

//Show all skydiving places
router.get("/", (req, res) => {
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
router.post("/",isLoggedIn, (req, res ) => {
    //get data from form and add to places array
    var name  =  req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPlace = {name: name, image: image, description: desc, author:author};
    // Create a new place or skydiving location and save to the sb
   Place.create(newPlace, (err, newlyCreated) => {
       if(err){
        console.log(err);
       }else{
           console.log("newlyCreated");
        res.redirect("/places");
       }

   });
});

//NEW - show form to create new place 
router.get("/new", isLoggedIn, function(req, res){
    res.render("places/new"); 
 });
//Show - show more info about specific skydive place
router.get("/:id", function(req,res)  {
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




// update place route
router.put("/:id", function(req,res)  {

    Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedPlace){
        if(err){
            res.redirect("/places")
        }else{
            res.redirect("/places/" + req.params.id);
        }

    });
})
// Edit place route
router.get("/:id/edit", function(req,res)  {
    Place.findById(req.params.id,  function(err, foundPlace){
        if(err){
            res.redirect("/places")
        }else{
            res.render("places/edit", {place: foundPlace});
        }

    });

})

// destroy place route
router.delete("/:id", function(req, res){
    Place.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/places")
        }else {
            res.redirect("/places")
        }

    })

});

 //middleware set up 
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;