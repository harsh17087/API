const express=require('express')
const router = express.Router()

const orderModelRequest = require('../controller/order.model')

// get request for Orders

router.get('/',orderModelRequest.get_order)

// get request for single order

router.get('/:orderId',orderModelRequest.get_single_order)

// post request for order
router.post('/',orderModelRequest.create_order)

// put request for single order
router.put('/:orderId',orderModelRequest.update_order)

//delete request for order
router.delete('/:orderId',orderModelRequest.delete_order)

module.exports  =router