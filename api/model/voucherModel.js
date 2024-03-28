const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const voucherSchema = Schema({
  _id:Schema.Types.ObjectId,  // _id keyword is mandatory
  id:{type:String,require:true},
  voucher_code:{type:String, require:true}
});

module.exports = mongoose.model("Voucher",voucherSchema)