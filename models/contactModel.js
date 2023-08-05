const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
      // New Property User_id for protected Routes ; So that we can have id from the jwt to verify that user is authorized
      user_id:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"User",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the Email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("contact",contactSchema)