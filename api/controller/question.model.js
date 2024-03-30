const mongoose = require('mongoose')
const Question = require('../model/questionModel')


// code for post request

exports.create_question =  async (req,res,next)=>{
    try{
        const questionObj = new Question({
            _id:new mongoose.Types.ObjectId(),
            question_code:req.body.question_code,
            question_des:req.body.question_des,
            option1:req.body.option1,
            option2:req.body.option2,
            option3:req.body.option3,
            option4:req.body.option4,
            isAnswer:req.body.isAnswer
        })
       const data=await questionObj.save()
        
        res.status(200).json({
            code:1,
            msg:"This is post request for Question",
            createdQuestion:data,
            error:null
        })
    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdQuestion:null,
            error:err
        })
    }
}

// code for getting question list

exports.get_questions = async (req,res,next)=>{
    try{
       const data = await  Question.find()
       if(data){
        res.status(200).json({
            code:1,
            message:"This is simple get request for Questions",
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

// code for getting single question

exports.get_question_by_id = async (req,res,next)=>{
    try{
        const data= await Question.findById(req.params.questionId)
        if(data){
            res.status(200).json({
                code:1,
                message: "This is get request for single Question",
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

// code to update single question

exports.update_question = async (req,res,next)=>{
    try{
            const data = await Question.findByIdAndUpdate(req.params.questionId,req.body,{new:true,runValidator:true});
            res.status(200).json({
                code:1,
                message:"This is simple put request for single question",
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

// code to delete a question

exports.delete_question = async (req,res,next)=>{
    try{
        const data  = await Question.findByIdAndDelete(req.params.questionId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No Product Found",
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