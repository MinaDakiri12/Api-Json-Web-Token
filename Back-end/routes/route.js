const express = require('express');
const router = express.Router();
const{auth} = require('../Middlewares/auth')
const {register,login,signout,updatePassword} = require('../controllers/userController')

router.post('/register',register)
router.post('/login',login)
router.post('/update/:id',updatePassword)
router.get('/signout',signout)







module.exports= router;