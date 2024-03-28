const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    _id:Schema.Types.ObjectId,
    fname:{type:String,require:true},
    email:{type:String,require:true},
    password: {type:String , require:true},
    contact:{type:String, require:true},
    gender:{type:String,require:true}
})

module.exports = mongoose.model("User",userSchema)