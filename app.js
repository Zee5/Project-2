const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set('port', process.env.PORT || 3003);

app.get("/", (req, res) => {
res.render("landing")

})


app.get("/places", (req, res) => {
   var places = [
    {name: "Skydive Santabarbara", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-J-Ht-eDEF15qPOqL7ThiLfPJNI7tXLJPHY_D3cppGa4RcsgpSw"},
    {name: "Skydive Dubai", image:"https://media-cdn.tripadvisor.com/media/photo-s/09/36/ae/54/skydive-dubai-palm-drop.jpg"},
    {name: "Fox Glacier", image:"http://flyingthenest.tv/wp-content/uploads/2015/04/SetWidth978-Bigfoot-over-the-glacier.jpg"},
    {name: "Outerspace", image:"http://flyingthenest.tv/wp-content/uploads/2015/04/001372acd0b511df6c5b01.jpg"},
    {name: "Denarau Island", image:"http://flyingthenest.tv/wp-content/uploads/2015/04/img0226-1024x683.jpg", width:"500", height:"500" }
   ]
   res.render("places", {places:places})
})


app.listen(app.get('port'), () => {
  console.log('The Share Skydiving experiance server is running at port 3003 .......')
})

