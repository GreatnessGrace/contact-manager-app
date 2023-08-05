const mongoose = require("mongoose")

const userSchema =  mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the User name"],
    },
    email: {
        type: String,
        required: [true, " Please add the user email address"],
        unique: [true, " The email is already in use"],
    },
    password: {
        type: String,
        required: [true, "Please set a user Password"]
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)