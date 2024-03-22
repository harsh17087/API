const express=require('express')
const router = express.Router()
const multer  = require('multer')
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./upload/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})
const productModelRequest = require('../controller/product.model')
// get request for products

router.get('/',productModelRequest.get_products)

// get request for single product

router.get('/:productId',productModelRequest.get_product_by_id)

// post request for product
router.post('/',upload.single("productImage"),productModelRequest.create_product)

// put request for single product
router.put('/:productId',productModelRequest.update_product)

//delete request for product
router.delete('/:productId',productModelRequest.delete_product)

module.exports  =router