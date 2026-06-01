
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose").default;
//you'r free to define your User how you like by defulat passport-local-mongoose will add u "USERNAME";ADD+ =>hash and salt;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);