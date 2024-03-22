const mongoose = require('mongoose')
const Order = require('../model/orderModel')

// code for creating order

exports.create_order = async (req,res,next)=>{
    try{
        const orderObj = new Order({
            _id:new mongoose.Types.ObjectId(),
            product:req.body.productId,
            quantity:req.body.quantity
        })

        const data = await orderObj.save()

        res.status(200).json({
            code:1,
            message:"order created successfully",
            data:data,
            error:null
        })
    }catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}



// code for getting list of order
exports.get_order = async (req,res,next)=>{
    try{
        let data = await Order.find()
        if(data){
            res.status(200).json({
                code:1,
                message:"This is a simple get request for products",
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
            message:"somehing went wrong",
            data:null,
            error:err
        })
    }
}

// code for getting single user

exports.get_single_order = async (req,res,next)=>{
    try{
        const data=await Order.findById(req.params.orderId)
        if(data){
            res.status(200).json({
                code:1,
                message:"this is get request for single order",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                message:"No order found with given id",
                data:null,
                error:null
            })
        }
    }catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}

// code to update single order

exports.update_order = async (req,res,next)=>{
    try{
        const data =await Order.findByIdAndUpdate(req.params.orderId,req.body,{new:true,runValidator:true})
        res.status(200).json({
            code:1,
            message:"this is simple put request for single order",
            data:data,
            error:null
        })
    }catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}

// code to delete an order
exports.delete_order = async (req,res,next)=>{
    try{
        const data = await Order.findByIdAndDelete(req.params.orderId)
        if(!data){
            res.status(404).json({
                code:1,
                message:"order not found",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                message:"order deleted successfully",
                data:data,
                error:null
            })
        }
    }catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}