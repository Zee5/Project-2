//dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//tell the app to use the following packages
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set('port', process.env.PORT || 3003);
var places = [
{
    name: "Interlaken, Switzerland",
    image: "http://flyingthenest.tv/wp-content/uploads/2015/04/7614434674_8c071d116c_b.jpg"
},
{
    name: "Skydive Santabarbara",
    image: "https://img.grouponcdn.com/deal/a4egjBojuhLfXC7VGJfw/cR-2048x1228/v1/c700x420.jpg"
},
{
    name: "Skydive Santabarbara",
    image: "https://www.bookmestatic.net.nz/images/activities/2541_image1_skydive-deals-byron-bay.jpg"
},

{
    name: "Skydive Santabarbara",
    image: "http://www.skydivefingerlakes.com/images/site/Skydiving-New-York-tandem.jpg"
},
{
    name: "Skydive Santabarbara",
    image: "http://flyingthenest.tv/wp-content/uploads/2015/04/SetWidth978-Bigfoot-over-the-glacier.jpg"
},
{
    name: "Outerspace",
    image: "http://www.skydivehawaii.com/Portals/0/WebSitesCreative_Banner/619/c13523d8-7137-4e0f-bec1-605bde33d03a.jpg"
},

{
    name: "Mount Everest, Nepal",
    image: "http://flyingthenest.tv/wp-content/uploads/2015/04/skydive.jpeg"
},
{
    name: "Outerspace",
    image: "http://flyingthenest.tv/wp-content/uploads/2015/04/001372acd0b511df6c5b01.jpg"
},
{
    name: "Outerspace",
    image: "https://picsum.photos/300/160"
},

{
    name: "Skydive Santabarbara",
    image: "https://picsum.photos/300/161"
},
{
    name: "Outerspace",
    image: "https://picsum.photos/300/160"
}


]

// Landing page
app.get("/", (req, res) => {
    res.render("landing")
})
//
app.get("/places", (req, res) => {
  
    res.render("places", {
        places: places
    })
});

app.post("/places", (req, res ) => {
    //get data from form and add to places array
    var name  =  req.body.name;
    var image = req.body.image;
    var newPlaces = {name: name, image:image};
    //add new skydiving place object at the begnig of the array 
    places.unshift(newPlaces);
     //add new skydiving place object at the end of the array 
     //places.push(newPlaces);
    //redirect back to places page
    res.redirect("/places");

});
// Show the form that will send the data to /places post route
app.get("/places/new", (req, res) => {
    res.render("new.ejs");

});

//listen at port 3003 and console log the message
app.listen(app.get('port'), () => {
    console.log('The Share Skydiving experiance server is running at port 3003 .......')
})