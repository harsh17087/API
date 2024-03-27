const express=require('express')
const router = express.Router()

const voucherModelRequest = require('../controller/voucher.model')
// get request for products

router.get('/',voucherModelRequest.get_vouchers)

// get request for single product

router.get('/:voucherId',voucherModelRequest.get_voucher_by_id)

// post request for product
router.post('/',voucherModelRequest.create_voucher)

// put request for single product
router.put('/:voucherId',voucherModelRequest.update_voucher)

//delete request for product
router.delete('/:voucherId',voucherModelRequest.delete_voucher)

module.exports  =router