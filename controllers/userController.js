const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a User
//@route Post /api/users/register
//@acess public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already Registered!")
    }
    console.log("hello")
    //Hash Password : bcrypt also going to provide a promise so we need to use the async await
    try {  const hashedPassword =await bcrypt.hash(password,10);
    console.log(hashedPassword)
   
     const user = await User.create({username,
         email,
         password: hashedPassword});
         console.log(`User created ${user}`);
         if(user){
             res.status(201).json({
                 _id: user.id,
                 email: user.email
             })
         }
         else{
             res.status(400);
             throw new Error("User data is not valid");
         }
   } catch (error) {
    res.status(500);
    console.log(error)
    throw new Error("User registration failed");
}
  });

//@desc Lagin a User
//@route Post /api/users/Login
//@acess public


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(! email || ! password){
        res.status(400);
        throw new Error("All fields are necessary");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            //Payload
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
        //Seceret KEy
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("Email or Password is wrong")
    }
  });

  
//@desc Current User
//@route Get /api/users/current
//@acess private

const currentUser = asyncHandler(async (req, res) => {
    // As we have decoded in the middlware and send , the user with request
    res.json(req.user);
  });



  module.exports = { registerUser, loginUser, currentUser }
  