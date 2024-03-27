const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// empId,empName,empPost,empGender,empSalary,empAddress
const employeeSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  empId:{type:Number , require:true},
  empName:{type:String , require:true},
  empPost:{type:String , require:true},
  empGender:{type:String , require:true},
  empSalary:{type:Number , require:true},
  empAddress:{type:String , require:true},
});

module.exports = mongoose.model("Employee",employeeSchema)