require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel')
const routes = require('./routes/route.js');
 

//config
const app = express()



///Midllewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use( cors({
  origin: 'http://localhost:3001',
  credentials: true,
})
);

//Routes
app.use('/api', routes);

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



