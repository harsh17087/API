const mongoose = require('mongoose')
const User = require('../model/userModel')


// code for creating user

exports.create_user =async  (req,res,next)=>{
    try{
        const userObj = new User({
            _id : new mongoose.Types.ObjectId,
            fname:req.body.fname,
            email:req.body.email,
            contact:req.body.contact,
            gender:req.body.gender,
            password:req.body.password
        })

        // const data=await userObj.save()

        if(!userObj.email || !userObj.password){
            res.status(500).json({
                code:1,
                msg:"can't insert empty fields",
                createdUser:null,
                error:null
            })
        }else{
            const data=await userObj.save()
            res.status(200).json({
                code:1,
                msg:"User created successfully",
                createdUser:data,
                error:null
            })
        }    
    }catch(err){
        res.status(500).json({
            code:0,
            msg:"Something went wrong",
            createdUser:null,
            error:err
        })
    }
}

// code for getting user list

exports.get_user=async (req,res,next)=>{
    try{
       const data = await  User.find()
       if(data){
        res.status(200).json({
            code:1,
            message:"This is simple get request for users",
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

// code for getting single user

exports.get_user_by_id=async (req,res,next)=>{
    try{
        const data= await User.findById(req.params.userId)
        if(data){
            res.status(200).json({
                code:1,
                message: "This is get request for single user",
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
    }catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}

// code to update single user

exports.update_user=async (req,res,next)=>{
    try{
        const data=await User.findByIdAndUpdate(req.params.userId,req.body,{new:true,runValidator:true})
        res.status(200).json({
            code:1,
            message:"This is simple put request for single user",
            data:data,
            error:null
        });
    }catch(err){
        res.status(500).json({
            code:0,
            message:"something went wrong",
            data:null,
            error:err
        })
    }
}

// code to delete user

exports.delete_user=async (req,res,next)=>{
    try{
        const data  = await User.findByIdAndDelete(req.params.userId);
        if(!data){
           res.status(404).json({
            code:1,
            message:"No user Found",
            data:data,
            error:null
           })
        }else{
            res.status(200).json({
                code:1,
                message:"delete request for user performed successfully",
                data:data,
                error:null
               })
        }
    }catch(err){
        res.status(500).json({
            code:0,
            message:"Somthing went wrong",
            data:null,
            error:err
           })
    }
}