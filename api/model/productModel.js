const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  name:{type:String , require:true},
  price:{type:String , require:true},
  productImage:{type:String}
});

module.exports = mongoose.model("Product",productSchema)