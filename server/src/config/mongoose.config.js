var mongoose = require("mongoose");

//CONNECT TO MONGODB set the schema
mongoose.connect('mongodb://localhost/myFlower');

module.exports = mongoose;