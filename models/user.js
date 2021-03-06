const mongoose=require('mongoose')
const Joi = require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5 ,
    maxlength:250
  },
  email:{
      type:String,
      required:true,
      minlength:5 ,
      maxlength:250,
      unique:true
    },
    password:{
      type:String,
      required:true,
      minlength:5 ,
      maxlength:250
    }
})
 userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id},config.get("jwtPrivateKey"));
  return token;
 }

const User= mongoose.model('User',userSchema)
  function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(255).required(),
      email:Joi.string().min(3).max(255).required().email(),
      password:Joi.string().min(3).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

  exports.User=User;
exports.validate=validateUser;

  