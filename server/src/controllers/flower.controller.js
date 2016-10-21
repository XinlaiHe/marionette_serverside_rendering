'use strict';
require('../models/flower.model.js');
const mongoose = require('../config/mongoose.config');
const FlowerModel = mongoose.model('Flower');
const ObjectId = require('mongoose').Types.ObjectId;


//search all articles
exports.getAll = (req,res,next) =>{
  FlowerModel.find({},(err,doc)=>{
    if(err){
      res.send('err',err);
    }else{
      console.log("on getting all flowers");
      res.jsonp(doc);
    }
  })
}

//search specific article with id
exports.getFlowerById = (req,res,next)=>{
  const id = req.params.id;
  //search article with id
  FlowerModel.findById(new ObjectId(id),(err,doc)=>{
    if(err){
      res.send('err',err);
    }else{
      console.log("on getting flower", id);
      res.jsonp(doc);
    }
  });
}

//delete specific article with id
exports.deleteFlowerById = (req, res, next)=>{
  const id = req.params.id;
  //search article with id
  FlowerModel.findByIdAndRemove(id, (err, doc)=>{
    if(err){
      res.send('err',err);
    }else{
      console.log('successfully delete flower', id);
      res.jsonp(doc);
    }
  });
}

exports.postFlower = (req, res) => {

  const flower = new FlowerModel(req.body);

  flower.save(function(err, data){
      if(err) console.log(err);
      else {
        res.jsonp(data);
        console.log("new flower is added");
      }
  });
}