const express = require("express");
const router =  express.Router({mergeParams:true});
const  Place = require("../models/place");
const  Comment = require("../models/comment");


// Comment new
router .get("/new",isLoggedIn, function(req, res){
    // find places by id
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {place: place});
        }
    })
});
//comment create
router .post("/",isLoggedIn, function(req, res){
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
                //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
                //save comment
                comment.save();
                place.comments.push(comment);
                place.save();
                console.log(comment);
                res.redirect('/places/' + place._id);
            }
         });
        }
    });

});
 //middleware set up 
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
