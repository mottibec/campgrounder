var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Cloudy skys",
    image: "https://s2.reutersmedia.net/resources/r/?m=02&d=20070208&t=2&i=361363&w=780&fh=&fw=&ll=&pl=&sq=&r=361363",
    description: "view the cloudy skys of iran in the only nuclear terror camp"
}, {
    name: "dark moon",
    image: "http://cdn.presstv.com/photo/20150508/bae5e784-16ce-43f0-ad6c-7497a51323e2.jpg",
    description: "sleep in the dark moons of afganistan"
}, {
    name: "holyWater camping",
    image: "http://media1.razorplanet.com/share/513244-1448/resources/2_image_1387386223_438987_resize1.75.jpg",
    description: "come sleeo on the holy water jesus walked on"
}, {
    name: "koh pangan nehao",
    image: "https://image.shutterstock.com/z/stock-photo-beach-in-koh-phangan-thailand-89308174.jpg",
    description: "best resort in koh pangan with plenty of ladyboys :)"
}]

function seedDB() {
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        else {
            console.log("deleted");
        }
    });
}
function seedDB3(){
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if (err) {
                console.log(err)
            }
            else {
                Comment.create({
                    text: "nice place",
                    author: "mojo"
                }, function(err, comment){
                    if (err) {
                        console.log("error")
                        console.log(err);
                    }
                    else
                    {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created comment")
                    }
                })
            }
        })
    })
    
}

module.exports = seedDB
