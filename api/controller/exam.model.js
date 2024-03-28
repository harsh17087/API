const mongoose = require('mongoose')
const Exam = require('../model/examModel')


// code for post request

exports.create_exam =  async (req,res,next)=>{
    try{
        const examObj = new Exam({
            _id:new mongoose.Types.ObjectId(),
            id:req.body.id,
            exam:req.body.exam,
            
        })
        
       const data=await examObj.save()
        
        res.status(200).json({
            code:1,
            msg:"exam created",
            createdExam:data,
            error:null
        })
    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdExam:null,
            error:err
        })
    }
}

// code for getting exam list

exports.get_exams = async (req,res,next)=>{
    try{
       const data = await  Exam.find()
       if(data){
        res.status(200).json({
            code:1,
            message:"This is simple get request for Exams",
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

// code for getting single Exam

exports.get_exam_by_id = async (req,res,next)=>{
    try{
        const data= await Exam.findById(req.params.examId)
        if(data){
            res.status(200).json({
                code:1,
                message: "This is get request for single Exam",
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

// code to update single exam

exports.update_exam = async (req,res,next)=>{
    try{
            const data = await Exam.findByIdAndUpdate(req.params.examId,req.body,{new:true,runValidator:true});
            res.status(200).json({
                code:1,
                message:"This is simple put request for single exam",
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

// code to delete a exam

exports.delete_exam = async (req,res,next)=>{
    try{
        const data  = await Exam.findByIdAndDelete(req.params.examId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No Exam Found",
            data:data,
            error:null
           })
        }else{
            res.status(200).json({
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