const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultLink = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
const listingSchema = new Schema({
    title:{
        type: String,
        required :true,

    },
    description:String,
    image: {
    filename: {
        type: String,
        default: "listingimage",
    },

    url: {
        type: String,
        default: defaultLink,
        set: (v) =>
            v === ""
                ? "defaultLink"
                : v,
    },
},
    price:Number,
    location:String,
    country:String,

});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;