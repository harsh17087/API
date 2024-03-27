const express=require('express')
const router = express.Router()


const examModelRequest = require('../controller/exam.model')
// get request for products

router.get('/',examModelRequest.get_exams)

// get request for single product

router.get('/:examId',examModelRequest.get_exam_by_id)

// post request for product
router.post('/',examModelRequest.create_exam)

// put request for single product
router.put('/:examId',examModelRequest.update_exam)

//delete request for product
router.delete('/:examId',examModelRequest.delete_exam)

module.exports  =router