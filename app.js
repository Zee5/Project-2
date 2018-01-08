const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set('port', process.env.PORT || 3003);

app.get("/", (req, res) => {
res.render("landing")

})


app.get("/places", (req, res) => {
   
    })








app.listen(app.get('port'), () => {
  console.log('The Share Skydiving experiance server is running at port 3003 .......')
})