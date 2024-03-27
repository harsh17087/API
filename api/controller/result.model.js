const mongoose = require('mongoose')
const Result = require('../model/resultModel')


// code for post request

exports.create_result =  async (req,res,next)=>{
    try{
        const resultObj = new Result({
            _id:new mongoose.Types.ObjectId(),
            id:req.body.id,
            stdName:req.body.stdName,
            resultStatus:req.body.resultStatus,
            totalMarks:req.body.totalMarks,
            obtainedMarks:req.body.obtainedMarks,
            
        })
        
       const data=await resultObj.save()
        
        res.status(200).json({
            code:1,
            msg:"Result Created",
            createdResult:data,
            error:null
        })
    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdResult:null,
            error:err
        })
    }
}

// code for getting result list

exports.get_results = async (req,res,next)=>{
    try{
       const data = await  Result.find()
       if(data){
        res.status(200).json({
            code:1,
            message:"This is simple get request for Results",
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

// code for getting single result

exports.get_result_by_id = async (req,res,next)=>{
    try{
        const data= await Result.findById(req.params.resultId)
        if(data){
            res.status(200).json({
                code:1,
                message: "This is get request for single Result",
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

// code to update single result

exports.update_result = async (req,res,next)=>{
    try{
            const data = await Result.findByIdAndUpdate(req.params.resultId,req.body,{new:true,runValidator:true});
            res.status(200).json({
                code:1,
                message:"This is simple put request for single result",
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

// code to delete a result

exports.delete_result = async (req,res,next)=>{
    try{
        const data  = await Result.findByIdAndDelete(req.params.resultId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No Result Found",
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