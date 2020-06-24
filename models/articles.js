var mongoose = require('mongoose');

var articleschema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: Buffer,
});
  
var ArticleModel = mongoose.model('articles', articleschema);
  
module.exports = ArticleModel;