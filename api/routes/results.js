const express=require('express')
const router = express.Router()


const resultModelRequest = require('../controller/result.model')
// get request for products

router.get('/',resultModelRequest.get_results)

// get request for single product

router.get('/:resultId',resultModelRequest.get_result_by_id)

// post request for product
router.post('/',resultModelRequest.create_result)

// put request for single product
router.put('/:resultId',resultModelRequest.update_result)

//delete request for product
router.delete('/:resultId',resultModelRequest.delete_result)

module.exports =router