let express = require("express");
let app = express();
let PORT = 3000;
let bodyParser = require("body-parser")
let mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/frontviewApp")

//SCHEMA SET UP
let projectSchema = new mongoose.Schema({
    name: String,
    image: String
});

let Project = mongoose.model("Project", projectSchema);

// Project.create({
//         name: "cloud",
//         image: "https://i.imgur.com/uQQ3nWl.jpg"

//     },
//     function(err, proj) {
//         if (err) {
//             console.log("ERROR")
//             console.log(err)
//         } else {
//             console.log(proj)
//         }
//     })


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/projectdisplay", function(req, res) {
    Project.find({}, function(err, allProjects) {
        if (err) {
            console.log(err)
        } else {
            res.render("projects", {
                //projectFiles is the variable used in the html/ejs
                //allProjects is the parameter which are the objects from the db collection we created
                projectFiles: allProjects
            })
        }
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