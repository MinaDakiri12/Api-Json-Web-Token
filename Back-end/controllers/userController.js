require('dotenv').config();
const express = require('express');
const User= require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register= async(req,res)=>{
    
const {name,email,password,role}=req.body;
const hashh= await bcrypt.hash(password, 10);
const  user = new User({
 name,email,password:hashh,role:role});


 user.save((err,user)=>{
if(err){
    return res.status(400).send(err)
}
res.send({user})

});
}

exports.login=(req,res)=>{
    const {email, password } = req.body;
    User.findOne({email}, async(err, user) => {
        
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found with this email, Please SignUp!'})
        }
        const isMatch =await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Incorrect password."})
        if (user.enabled === false)
        return res.status(200).json({ enabled: false, id: user._id });

        const token = jwt.sign({user_id: user._id,role: user.role,}, process.env.JWT_SECRET);

        res.cookie('token', token, {expiresIn:"1d"})

        const { _id, nom, email,role } = user;

        return res.json({
            token, user: {_id, nom, email,role}
           
        })

    })
}
exports.signout = (req, res) => {

    res.clearCookie('token');

    res.json({
        message: "User Signout"
    })

}  

exports.updatePassword = async (req, res) => {
    
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json('Id non Valid');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.enabled = true;
    console.log(user);
    const saveUser = await user.save();
    if (saveUser) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res
        .status(200)
        .cookie('token', token, {
        expire: new Date() + 8062000,
          httpOnly: true,
        })
        .json({ isAuth: true, role: user.role });
    }
};


