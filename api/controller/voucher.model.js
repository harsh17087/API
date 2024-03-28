const mongoose = require('mongoose')
const Voucher = require('../model/voucherModel')


// code for post request

exports.create_voucher =  async (req,res,next)=>{
    try{
        const voucherObj = new Voucher({
            _id:new mongoose.Types.ObjectId(),
            id:req.body.id,
            voucher_code:req.body.voucher_code,
            
        })
        
       const data=await voucherObj.save()
        
        res.status(200).json({
            code:1,
            msg:"voucher created",
            createdVoucher:data,
            error:null
        })
    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdVoucher:null,
            error:err
        })
    }
}

// code for getting voucher list

exports.get_vouchers = async (req,res,next)=>{
    try{
       const data = await  Voucher.find()
       if(data){
        res.status(200).json({
            code:1,
            message:"This is simple get request for Vouchers",
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

// code for getting single Voucher

exports.get_voucher_by_id = async (req,res,next)=>{
    try{
        const data= await Voucher.findById(req.params.voucherId)
        if(data){
            res.status(200).json({
                code:1,
                message: "This is get request for single Voucher",
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

// code to update single voucher

exports.update_voucher = async (req,res,next)=>{
    try{
            const data = await Voucher.findByIdAndUpdate(req.params.voucherId,req.body,{new:true,runValidator:true});
            res.status(200).json({
                code:1,
                message:"This is simple put request for single voucher",
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

// code to delete a voucher

exports.delete_voucher = async (req,res,next)=>{
    try{
        const data  = await Voucher.findByIdAndDelete(req.params.voucherId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No Voucher Found",
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