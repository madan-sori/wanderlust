const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner ,validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


     
   //Index route
   router.get("/", wrapAsync(listingController.index) );


    //new Route
    router.get("/new",isLoggedIn,listingController.renderNewForm);


    //Create route
    router.post("/",
    isLoggedIn,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.createListing));
    

    //show
    router.get("/:id",
    wrapAsync( listingController.showListing) ); 
   

    //edit route
    router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm) );
   
   
   //update route 
   router.patch("/:id", 
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.updateListing));

   //DELETE route
   
   router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));
   
   
   

   module.exports = router;