var mongoose = require('mongoose');

var messageschema = mongoose.Schema({
    title: String,
    content: String,
    dateExp: Date,
    read: Boolean,
    sender: String,
});

var taskschema = mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date,
});


var userschema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: String,
    gender: String,
    dateInsert: Date,
    messages: [messageschema],
    tasks: [taskschema],
});
  
var UserModel = mongoose.model('users', userschema);
  
module.exports = UserModel;