const express = require ('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/users');
  console.log('db connected')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//schema
const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String
  });

//model
const User = mongoose.model('User', userSchema);




const server = express();

//middleware
server.use(cors());
server.use(bodyParser.json())

//api
server.post('/user',async(req,res)=>{

    let user= new User()
    user.name=req.body.name
    user.username=req.body.email
    user.password=req.body.password
   const doc= await user.save()

    console.log(doc)
    res.json(doc)

})

//port
server.listen(8080,()=>{
    console.log('server is started')
})
