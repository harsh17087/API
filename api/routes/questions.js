const express=require('express')
const router = express.Router()

const questionModelRequest = require('../controller/question.model')
// get request for questions

router.get('/',questionModelRequest.get_questions)

// get request for single question

router.get('/:questionId',questionModelRequest.get_question_by_id)

// post request for question
router.post('/',questionModelRequest.create_question)

// put request for single question
router.put('/:questionId',questionModelRequest.update_question)

//delete request for question
router.delete('/:questionId',questionModelRequest.delete_question)

module.exports  =router