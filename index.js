require('dotenv').config();
const express = require ('express');
const mongoose = require('mongoose');


const app = express()





//db Mongodb
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology : true,

})
.then(()=> console.log('db connected'))
.catch(()=> console.log('not connected to the database!'))


app.get('/', (req, res) =>{
  res.sendDate({message: "test"})  
})

const port = process.env.PORT || 8080


app.listen(port, ()=> console.log(`app is running on port ${port}`));
