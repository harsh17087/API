const express=require('express')
const router = express.Router()
const userRequestModel=require('../controller/user.model.js')

router.post("/:userId", userRequestModel.add_address)
router.put("/:userId", userRequestModel.remove_address)
module.exports=router
