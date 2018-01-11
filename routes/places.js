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
router.post("/", (req, res ) => {
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
/*
// Show the form that will send the data to /places post route
router.get("/places/new", (req, res) => {
    res.render("places/new");

});
*/

//NEW - show form to create new place 
router.get("/new", function(req, res){
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

module.exports = router;