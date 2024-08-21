const mongoose = require('mongoose');
const UserModel = require('../userScema');
const bcrypt = require('bcrypt');
const userValidation = require('../../validation/userValidator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { validationResult } = require('express-validator');


async function createUser(req,res){
  try {
    let result = validationResult(req);
    if(!result.isEmpty()){
      return res.status(404).json(result.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(3);
    const hash = await bcrypt.hash(password, salt);

    const user = new UserModel({
      login: req.body.login,
      email: req.body.email,
      location: req.body.location,
      collections: req.body.collections,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    let saved = await user.save();

    res.json(saved);
  } catch (error) {
    console.log(error);
    res.status(400).json({msg: "bad request"});
    
  }
};

async function loginUser(req, res){
  try {
    // const user = await UserModel.findOne({email: req.body.email});
    const user = await UserModel.findOne({login: req.body.login});
    if(!user){
      return res.status(400).json({msg:"invalid, Not found"});
    }
    let passwordCheck = await bcrypt.compare(req.body.password, user.passwordHash);
    if(!passwordCheck){
      res.status(400).json({msg:"Invalid"});
    }
    const {passwordHash, _id, role, updatedAt, __v, items,  ...userData} = user._doc;
    const token = jwt.sign({_id: user._id}, "secretKey", {expiresIn: "10d"});
    // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({...userData, token, });
    // res.redirect('/main');
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"bad request"});
  }
}

function authMe(req, res, next){
  // const token = (req.headers.authorization ||'').replace(/Bearer\s?/, '');
  const token = req.cookies.token;
  if(token){
    try {
      let decoded = jwt.verify(token, "secretKey");
      req.userId = decoded._id
      next();
    } catch (error) {
      console.log(error);
      return res.status(405).json({msg: "invalid authentification"});
    }
  }else{
    return res.status(403).json({msg:"no auth"});
  }
};




module.exports = {
  createUser,
  loginUser,
  authMe
}

