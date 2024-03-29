const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const questionSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  question_code:{type:String , require:true},
  question_des:{type:String , require:true},
  option1:{type:String},
  option2:{type:String},
  option3:{type:String},
  option4:{type:String},
  isAnswer:{type:String}
});

module.exports = mongoose.model("Question",questionSchema)