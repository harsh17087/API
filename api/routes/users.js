const express=require('express')
const router = express.Router()
const userRequestModel=require('../controller/user.model')

router.get('/',userRequestModel.get_user)

router.get('/:userId',userRequestModel.get_user_by_id)

router.post('/',userRequestModel.create_user)

router.put('/:userId',userRequestModel.update_user)

router.delete('/:userId',userRequestModel.delete_user)

module.exports  =router
