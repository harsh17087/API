const mongoose = require('mongoose')
const Item = require('../model/itemModel')
const Seller = require('../model/sellerModel')
// post request

exports.create_item = async (req,res,next)=>{
    const {sellerId} = req.body
    // const populatedSellerId =Seller.findById(sellerId).populate()
    // console.log(populatedSellerId)
    try{
        const itemObj = new Item({
            _id:new mongoose.Types.ObjectId(),
            sellerId:sellerId,
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category,
            image:req.body.image,
            rating:req.body.rating,
            stock:req.body.stock
        })

        const data = await itemObj.save()
        res.status(200).json({
            code:1,
            msg:"This is post request for Item",
            createdItem:data,
            error:null
        })
    }catch(err){
        res.status(200).json({
            code:0,
            msg:"Something went wrong",
            createdItem:null,
            error:err
        })
    }
}


exports.get_items = async (req,res,next)=>{
    try{
       const data = await  Item.find()
       if(data){
        res.status(200).json({
            data
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


exports.get_item_by_id = async (req,res,next)=>{
    try{
        const data= await Item.findById(req.params.itemId)
        if(data){
            res.status(200).json({
                data
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


exports.update_item = async (req,res,next)=>{
    try{
            const data = await Item.findByIdAndUpdate(req.params.itemId,req.body,{new:true,runValidator:true});
            res.status(200).json({
                code:1,
                message:"This is simple put request for single item",
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

exports.delete_item = async (req,res,next)=>{
    try{
        const data  = await Item.findByIdAndDelete(req.params.itemId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No Item Found",
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