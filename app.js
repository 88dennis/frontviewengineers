let express = require("express");
let app = express();
let PORT = 3000;
let bodyParser = require("body-parser")
let projectArr = [
    { name: "butter", image: "https://i.imgur.com/QblTtQH.jpg" },
    { name: "cloud", image: "https://i.imgur.com/uQQ3nWl.jpg" },
    { name: "rain", image: "https://i.imgur.com/91yP5jP.jpg" },
]

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/projectdisplay", function(req, res) {
    res.render("projects", {
        projectFiles: projectArr
    })
})

//RESTFUL
//check first with postman if post route is working
//npm i body-parser then use it
//create a form inside any get route you want it to render into
//at the form the action attribute value should be the post route
//the post route will capture the input value and redirects it to a get route for it to render
app.post("/projectdisplaypost", function(req, res) {
    let projName = req.body.name;
    let projPhoto = req.body.image;
    let newProj = { name: projName, image: projPhoto };
    projectArr.push(newProj)
    res.redirect("/projectdisplay")
})

app.get("/newProject", function(req, res) {
    //this only renders the form
    res.render("addproject.ejs")
})

app.listen(PORT, function() {
    console.log("SERVER CONNECTED " + "http://localhost:" + PORT)
})