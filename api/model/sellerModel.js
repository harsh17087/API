const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellerSchema = ({
    _id:{type: Schema.Types.ObjectId},
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    token:{type:String, require:true}
})

module.exports = mongoose.model('Seller',sellerSchema)