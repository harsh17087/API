const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//  title, price, description, category, image , rating {rate, count} , seller {e-mail, password, name}

const itemSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  sellerId:{
    type: Schema.Types.ObjectId,
    ref : "Seller",
  },
  title:{type:String , require:true},
  price:{type:Number , require:true},
  description:{type:String , require:true},
  category:{type:String , require:true},
  image:{type:String , require:true},
  rating : {
    rate : {type:Number, require:true},
    count : {type : Number, require:true}
  } 
});

module.exports = mongoose.model("Item",itemSchema)