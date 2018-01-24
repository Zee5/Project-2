const express = require("express");
const router = express.Router({
    mergeParams: true
});
const Place = require("../models/place");
const Comment = require("../models/comment");


// Comment new
router.get("/new", isLoggedIn, function (req, res) {
    // find places by id
    Place.findById(req.params.id, function (err, place) {
        // This is an older callback based syntax of mongoose
        // While you can use Promise methods instead and have more readable code,
        // in some settings, like with legacy apps, that may not be possible.
        // It is good to know the callback pattern as well. It appears in many, 
        // many other places outside mongoose.

        // I would say it's good to know both patterns, but to have the more modern Promise-style
        // in your portfolio projects
        // With ES6 Promise,
        //.then and .catch would replace this conditional here with the modern Promise pattern
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                place: place
            });
            //  res.render("comments/new", {place}) //ES6 shorthand, if you like
        }
    })
});
//comment create
router.post("/", isLoggedIn, function (req, res) {
    //lookup place using id
    Place.findById(req.params.id, function (err, place) {
        if (err) {
            console.log(err);
            res.redirect("/places");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // you are double-saving comments here: comment here will be the result of a successful .create

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
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
