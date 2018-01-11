const mongoose = require("mongoose");
const Place = require("./models/place");
const Comment = require("./models/comment");
const data = [
    {
        name: "Interlaken, Switzerland",
        image: "http://flyingthenest.tv/wp-content/uploads/2015/04/7614434674_8c071d116c_b.jpg",
        description: "Lorem ipsum 1 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Skydive Santabarbara",
        image: "https://img.grouponcdn.com/deal/a4egjBojuhLfXC7VGJfw/cR-2048x1228/v1/c700x420.jpg",
        description: " Lorem ipsum 2 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Outerspace",
        image: "http://www.skydivehawaii.com/Portals/0/WebSitesCreative_Banner/619/c13523d8-7137-4e0f-bec1-605bde33d03a.jpg",
        description: "Lorem ipsum 3 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }, 
    {
        name: "Mount Everest, Nepal",
        image: "http://flyingthenest.tv/wp-content/uploads/2015/04/skydive.jpeg",
        description: " Lorem ipsum 4dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }

]
function seedDB(){
    //Remove all skydiving places
   Place.remove({}, (err) => {
    if(err){
        console.log(err)
    }
console.log("skydiving loacation places removed!!!!!")
// Add few skydiving places 
data.forEach((seed) => {
    
        Place.create(seed, (err, place) => {
            if(err){
                console.log(err)
            }else{
                console.log("added a skydive place")
                // Create a comment on each places
                Comment.create(
                    {
                        text: "1. Lorem ipsum 5 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        author: "Zola"
                        
                    }, (err, comment) => {
                        if(err){
                            console.log(err)
                        }else{
                        place.comments.push(comment);
                        place.save();
                        console.log("created new comments");
                    }
                })
            }
        })
    })

}); 
// Add feww comments
}

module.exports = seedDB;