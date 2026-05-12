const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const { title } = require("process");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
.then(() => {
    console.log("connected to db");

})
.catch((err) => {
    console.log(err);
});

async function main (){
    await mongoose.connect(MONGO_URL);
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")));



app.get("/", (req,res) => {
    res.send ("hi im root");
});
 
//new route
 app.get("/listings/new",(req,res) => {
    res.render("listings/new")
 });

//create route
app.post("/listings", async(req,res) => {

    const newListing = new Listing(req.body);

    await newListing.save();

    res.redirect("/listings"); 
});

//home page route
app.get("/listings", async(req,res) =>{
   const allListing = await  Listing.find({});
    //  console.log(allListing);
     res.render("listings/index" , { allListing });
});

//
app.get("/listings/:id",async(req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}); 

//edit route
app.get("/listings/:id/edit",async(req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});


//update route 
app.patch("/listings/:id", async(req,res) => {

    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body);

    res.redirect(`/listings/${id}`);

});
//DELETE route

app.delete("/listings/:id",async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


// app.get("/testListing", async (req,res) =>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description: "by the beach",
//         price: 1200,
//         location:"calangute,goa",
//         country:"india",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080 , () =>{
    console.log("server is listening port 8080");
});