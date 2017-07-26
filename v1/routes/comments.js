var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router();

router.get("/campgrounds/:id/comments/new", isLoggedIn ,function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
       if (err) {
           console.log(err);
       }
       else {
            res.render("comments/new", {campground: foundCampground});
       }
   })
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       }
       else {
         Comment.create(req.body.comment, function(err, comment) {
             if (err) {
                 console.log(err);
             } else {
                 comment.author.id = req.user.id;
                 comment.author.username = req.user.username;
                 comment.save();

                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/campgrounds/" + campground.id)
             }
         })
       }
   })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;