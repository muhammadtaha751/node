const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new mongoose.Schema({
  name: String,
  email: {type:String,unique:true},
  password:{  type: String,
    required: true,
    minlength: 6,},
  number:String
},{
  collection:"UserInfo"
})


mongoose.model('UserInfo', usersSchema)
