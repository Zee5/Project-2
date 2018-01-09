const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set('port', process.env.PORT || 3003);
// Landing page
app.get("/", (req, res) => {
    res.render("landing")
})
//
app.get("/places", (req, res) => {
    var places = [{
            name: "Skydive Santabarbara",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-J-Ht-eDEF15qPOqL7ThiLfPJNI7tXLJPHY_D3cppGa4RcsgpSw"
        },
        {
            name: "Outerspace",
            image: "http://flyingthenest.tv/wp-content/uploads/2015/04/001372acd0b511df6c5b01.jpg"
        },
        {
            name: "Skydive Dubai",
            image: "https://media-cdn.tripadvisor.com/media/photo-s/09/36/ae/54/skydive-dubai-palm-drop.jpg"
            
        },
        {
            name: "Fox Glacier",
            image: "http://flyingthenest.tv/wp-content/uploads/2015/04/SetWidth978-Bigfoot-over-the-glacier.jpg"
        },
        {
            name: "Denarau Island",
            image: "https://images.unsplash.com/photo-1418846531910-2b7bb1043512?auto=format&fit=crop&w=1050&q=80"
        },
       
    ]
    res.render("places", {
        places: places
    })
});

app.post("/places", (req, res ) => {
    res.send(" You just hit the post route.")
//get data from form and add to places array

//redirect back to places page

});
// Show the form that will send the data to /places post route
app.get("/places/new", (req, res) => {
    res.render("new.ejs");

});

//listen at port 3003 and console log the message
app.listen(app.get('port'), () => {
    console.log('The Share Skydiving experiance server is running at port 3003 .......')
})