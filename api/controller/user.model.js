const mongoose = require("mongoose");
const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");

// Generate hashed password through bcrypt library
async function hashedPassword(password) {
  const hashpass = bcryptjs.hash(password, 10);
  return hashpass;
}
// compare userpass with hashedpass while seller logs in
async function comparePassword(userPass, hashedPass) {
  const isTrue = bcryptjs.compare(userPass, hashedPass);
  return isTrue;
}

// code for logging in users
exports.check_user = async (req,res,next)=>{
    try{
        const userDataPresent = await User.findOne({email:req.body.email})
        const passValid  = await comparePassword(req.body.password,userDataPresent.password)

        if(userDataPresent && passValid){
            res.status(200).json({
                code:1,
                message:"User Logged in",
                data:userDataPresent
            })
        }else{
            res.status(401).json({
                code:0,
                message:"Wrong credentials",
                data:null
            })
        }
    }catch(err){
        res.status(500).json({
            code:0,
            message:"Something went wrong",
            error:err
        })
    }
}


// code for creating user

exports.create_user = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.body.email });

    if (check) {
      alert("User already exist");
    } else {
      const userObj = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: await hashedPassword(req.body.password),
        phone: req.body.contact,
        address: req.body.address,
      });

      const data = await userObj.save();
      res.status(200).json({
        code: 1,
        msg: "User created successfully",
        createdUser: data,
        error: null,
      });
    }} catch (err) {
    res.status(500).json({
      code: 0,
      msg: "Something went wrong",
      createdUser: null,
      error: err,
    });
  }
};

// code for getting user list

exports.get_user = async (req, res, next) => {
  try {
    const data = await User.find();
    if (data) {
      res.status(200).json({
        data
      });
    } else {
      res.status(200).json({
        code: 1,
        message: "No data found",
        data: null,
        error: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong",
      data: null,
      error: err,
    });
  }
};

// code for getting single user

exports.get_user_by_id = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.userId);
    if (data) {
      res.status(200).json({
        data
      });
    } else {
      res.status(200).json({
        code: 1,
        message: "No data found with given id",
        data: null,
        error: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "something went wrong",
      data: null,
      error: err,
    });
  }
};

// code to update single user

exports.update_user = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      code: 1,
      message: "This is simple put request for single user",
      data: data,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "something went wrong",
      data: null,
      error: err,
    });
  }
};

// code to delete user

exports.delete_user = async (req, res, next) => {
  try {
    const data = await User.findByIdAndDelete(req.params.userId);
    if (!data) {
      res.status(404).json({
        code: 1,
        message: "No user Found",
        data: data,
        error: null,
      });
    } else {
      res.status(200).json({
        code: 1,
        message: "delete request for user performed successfully",
        data: data,
        error: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Somthing went wrong",
      data: null,
      error: err,
    });
  }
};

// code to add new address

exports.add_address = async (req,res,next)=>{
  try{
    await User.updateOne({_id:req.params.userId},{$push:{address:req.body.address}})
    const data = await User.findById(req.params.userId);
    res.status(200).json({
      message:"Address updated successfully",
      data:data
    })
  }catch(error){
    res.status(500).json({
      code: 0,
      message: "Somthing went wrong",
      data: null,
      error: err,
    });
  }
}

exports.remove_address = async(req,res,next)=>{
  try{
    await User.updateOne({_id:req.params.userId},{$pull:{address:await req.body.address}})
    const data = await User.findById(req.params.userId);
    res.status(200).json({
      message:"Address deleted successfully",
      data:data
    })
  }catch(error){
    res.status(500).json({
      code: 0,
      message: "Somthing went wrong",
      data: null,
      error: err,
    });
  }
}