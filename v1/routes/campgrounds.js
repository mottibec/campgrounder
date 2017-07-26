var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();

router.get("/campgrounds", function(req, res) {
    console.log("campgrounds route")
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});

router.post("/campgrounds", isLoggedIn ,function(req, res) {
    var author = {
        id: req.user.id,
        username: req.user.username
    }; 
    
      var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: author
    };
    
    Campground.create(newCampground,
        function(err, campground) {
            if (err) {
                console.log(err)
            }
            else {
                res.redirect("/campgrounds");
            }
        });
})

router.get("/campgrounds/new",isLoggedIn ,function(req, res) {
    console.log("new route")
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
               res.render("campgrounds/show", {campground: foundCampground});
        }
    });

})

router.get("/campgrounds/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
               res.render("campgrounds/edit", {campground: foundCampground});
        }
    });

})

router.put("/campgrounds/:id", function(req, res){
     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
         if (err) {
             res.redirect("/campgrounds");
         }
         else{
             res.redirect("/campgrounds/" + req.params.id);
         }
     })
})

router.delete("/campgrounds/:id", function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           res.redirect("/campgrounds");
       }
       else {
            res.redirect("/campgrounds");
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