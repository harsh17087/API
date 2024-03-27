const express=require('express')
const router = express.Router()


const employeeModelRequest = require('../controller/employee.model')
// get request for products

router.get('/',employeeModelRequest.get_employees)

// get request for single product

router.get('/:employeeId',employeeModelRequest.get_employee_by_id)

// post request for product
router.post('/',employeeModelRequest.create_employee)

// put request for single product
router.put('/:employeeId',employeeModelRequest.update_employee)

//delete request for product
router.delete('/:employeeId',employeeModelRequest.delete_employee)

module.exports  =router