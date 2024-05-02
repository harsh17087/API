const express=require('express')
const router = express.Router()


const itemModelRequest = require('../controller/item.model')
// get request for items

router.get('/',itemModelRequest.get_items)

// get request for single item

router.get('/:itemId',itemModelRequest.get_item_by_id)

// post request for item
router.post('/',itemModelRequest.create_item)

// put request for single item
router.put('/:itemId',itemModelRequest.update_item)

//delete request for item
router.delete('/:itemId',itemModelRequest.delete_item)

module.exports  =router