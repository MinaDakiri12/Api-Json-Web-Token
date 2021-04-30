require('dotenv').config();
const express = require ('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel')
const routes = require('./routes/route.js');
 


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const port = process.env.PORT || 8080


app.listen(port, ()=> console.log(`app is running on port ${port}`));





//db Mongodb
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology : true,

})
.then(()=> console.log('db connected'))
.catch(()=> console.log('not connected to the database!'))


 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});

app.use('/api', routes);

//mid

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) {
    return res.status(401).json({
     error: "JWT token has expired, please login to obtain a new one"
    });
   }
   res.locals.loggedInUser = await User.findById(userId);
   next();
  } else {
   next();
  }
});
