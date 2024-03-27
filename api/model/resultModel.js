const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const resultSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  id:{type:String , require:true},
  stdName:{type:String , require:true},
  resultStatus:{type:String, require:true},
  totalMarks:{type:Number, require:true},
  obtainedMarks:{type:Number, require:true},
});

module.exports = mongoose.model("Result",resultSchema)