const User= require('../models/userModel');
const jwt=require('jsonwebtoken')
require('dotenv').config();

exports.auth = (Role) => (req, res, next) => {
    const  token  = req.cookies;
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT, async (err, decodedtoken) => {
        console.log(decodedtoken);
        if (!err && decodedtoken.role === Role) {
          res.currentUser = await User.findOne({ _id: decodedtoken.id })
          next();
        } else {
          return res
            .clearCookie('token')
            .json({ isAuth: false, role: '', ifError: 'ifError' });
        }
      });
    } else {
      return res.json({ isAuth: false, role: '', ifNotToken: 'ifNotToken' });
    }
};
