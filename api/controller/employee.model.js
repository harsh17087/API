const mongoose = require('mongoose')
const Employee = require('../model/employeeModel')


// code for post request

exports.create_employee =  async (req,res,next)=>{
    try{
        const employeeObj = new Employee({
            _id:new mongoose.Types.ObjectId(),
            empId:req.body.empId,
            empName:req.body.empName,
            empPost:req.body.empPost,
            empSalary:req.body.empSalary,
            empGender:req.body.empGender,
            empAddress:req.body.empAddress,
        })
        
       const data=await employeeObj.save()
        
        res.status(200).json({
            code:1,
            msg:"This is post request for Employee",
            createdEmployee:data,
            error:null
        })
    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdEmployee:null,
            error:err
        })
    }
}

// code for getting employee list

exports.get_employees = async (req,res,next)=>{
    try{
       const data = await  Employee.find()
       if(data){
        res.status(200).json({
            code:1,
            message:"This is simple get request for Employees",
            data:data,
            error:null
        })
       }else{
        res.status(200).json({
            code:1,
            message:"No data found",
            data:null,
            error:null
        })
       }
    }catch(err){
        res.status(500).json({
            code:0,
            message:"Something went wrong",
            data:null,
            error:err
        })
    }
}

// code for getting single employee

exports.get_employee_by_id = async (req,res,next)=>{
    try{
        const data= await Employee.findById(req.params.employeeId)
        if(data){
            res.status(200).json({
                code:1,
                message: "This is get request for single Employee",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                message:"No data found with given id",
                data:null,
                error:null
            })
        }
    }
    catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}

// code to update single employee

exports.update_employee = async (req,res,next)=>{
    try{
            const data = await Employee.findByIdAndUpdate(req.params.employeeId,req.body,{new:true,runValidator:true});
            res.status(200).json({
                code:1,
                message:"This is simple put request for single employee",
                data:data,
                error:null
            });
    }catch(error){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:error
        })
    }
}

// code to delete a employee

exports.delete_employee = async (req,res,next)=>{
    try{
        const data  = await Employee.findByIdAndDelete(req.params.employeeId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No Employee Found",
            data:data,
            error:null
           })
        }else{
            res.status(404).json({
                code:1,
                message:"delete request perform successfully",
                data:data,
                error:null
               })
        }
    }catch(error){
        res.status(500).json({
            code:0,
            message:"Somthing went wrong",
            data:null,
            error:error
           })
    }
}