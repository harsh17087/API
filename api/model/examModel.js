const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const examSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  id:{type:String,required:true},
  exam:{type:String, require:true}
});

module.exports = mongoose.model("Exam",examSchema)