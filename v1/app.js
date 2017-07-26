var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
        passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    User = require("./models/user")
    
    //seedDB();
    mongoose.connect("mongodb://localhost/yelp_camp");
    app.use(bodyParser.urlencoded({
    extended: true}));
    app.set("view engine", "ejs");
    app.use(methodOverride("_method"));
    app.use(express.static(__dirname + "/public"));
    
    app.use(require("express-session")({
    secret: "i am mojo the coder",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("yelpCamp started")
});
