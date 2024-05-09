const express=require('express')
const router = express.Router()
const userRequestModel=require('../controller/user.model.js')

router.get('/',userRequestModel.get_user)

router.get('/:userId',userRequestModel.get_user_by_id)

router.post('/',userRequestModel.create_user)

router.put('/:userId',userRequestModel.update_user)

router.delete('/:userId',userRequestModel.delete_user)

// credential check
router.post("/login",userRequestModel.check_user)

// address addition

module.exports=router
