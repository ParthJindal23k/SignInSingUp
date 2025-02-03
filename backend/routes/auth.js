const express = require("express");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const user = require("../models/User");
const router  = express.Router();


const verifyToken = require("../middleware/verifyToken");


const JWT_SECRET = process.env.JWT_SECRET || "123456";
router.post("/signup" , async (req,res) =>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const existingUser = await user.findOne({email});
    if(existingUser){
        return res.json({message:"User Already exist"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new user({
        username,
        email,
        password:hashedPassword
    })

    await newUser.save();
   

    const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {expiresIn:"12h"} );
    res.status(201).json({token});

})


router.post("/signin",async(req,res) =>{
    const {email,password} = req.body;
    const foundUser = await user.findOne({email});
    if(!foundUser){
        return res.status(400).json({message:"Invalid User"});
    }

    const isMatch = await bcrypt.compare(password,foundUser.password);
    if(!isMatch){
        return res.status(400).json({message:"Wrong password"});

    }

    const token= jwt.sign({id:foundUser.id,email:foundUser.email},process.env.JWT_SECRET,{expiresIn:'12h'});
    console.log(token);
    res.status(200).json({
    token,
    user: {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    },
  });
});

router.get("/profile",verifyToken,(req,res) =>{
    return res.json({message:"This is your profile" , user:req.user});
})
    
module.exports = router;