const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcrypt');
const {User}=require('../models/user');
const mongoose=require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const config=require('config')
// const Joi = require('joi');


router.post('/',async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
       if(!user) return res.status(400).send('invalid id ');

   
    const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalisd password.');


    const token=user.generateAuthToken();
    
    res.send(token);
}); 

   function validate(req) {
    const schema = {
    //   name: Joi.string().min(3).max(255).required(),
      email:Joi.string().min(3).max(255).required().email(),
      password:Joi.string().min(3).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }
  
module.exports=router;