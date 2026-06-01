const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultLink = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
const Review = require("./review.js");
const listingSchema = new Schema({
    title:{
        type: String,
        required :true,

    },
    description:String,
    image: {
       url:String,
       filename: String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },

    ], 
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },

});

listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in : listing.reviews}});
    }
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;