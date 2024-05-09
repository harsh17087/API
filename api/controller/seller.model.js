const mongoose = require("mongoose");
const Seller = require("../model/sellerModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cookieParser=require('cookie-parser')



// Generate hashed password through bcrypt library
async function hashedPassword(password) {
    const hashpass = bcryptjs.hash(password,10)
    return hashpass
}
// compare userpass with hashedpass while seller logs in
async function comparePassword(userPass,hashedPass){
    const isTrue = bcryptjs.compare(userPass,hashedPass)
    return isTrue
}

// code for checking credentials while user logs in
exports.check_seller = async (req,res,next)=>{
    try{
        const sellerDataPresent = await Seller.findOne({email:req.body.email})
        const passValid  = await comparePassword(req.body.password,sellerDataPresent.password)

        if(sellerDataPresent && passValid){
            
            res.cookie('jwt',sellerDataPresent.token,{
                maxAge:60000,
                httpOnly:true
            })

            res.status(200).json({
                code:1,
                message:"Seller Logged in",
                data:sellerDataPresent
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


// code for registering seller

exports.create_seller = async (req, res, next) => {
  try {
    const check = await Seller.findOne({ email: req.body.email });

    if (check) {
      alert("Seller already exist");
    } else {
      const token = jwt.sign(
        { email: req.body.email },
        "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
      );
      const sellerObj = new Seller({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password:await hashedPassword(req.body.password),
        token: token,
      });
      const data = await sellerObj.save();
      res.status(200).json({
        code: 1,
        msg: "Seller created successfully",
        createdSeller: data,
        error: null,
      });
    }
  } catch (err) {
    res.status(409).json({
      code: 0,
      msg: "Something went wrong",
      createdSeller: null,
      error: err,
    });
  }
};

// code for getting Seller list

exports.get_seller = async (req, res, next) => {
  try {
    const data =await Seller.find();
    if (data) {
      res.status(200).json({
        data: data,
      });
    } else {
      res.status(200).json({
        message: "No data found",
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

// code for getting single seller

exports.get_seller_by_id = async (req, res, next) => {
  try {
    const data =await  Seller.findById(req.params.sellerId);
    if (data) {
      res.status(200).json({
        data: data,
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
      message: "Something went wrong",
      data: null,
      error: err,
    });
  }
};

// code to update single seller

exports.update_seller = async (req, res, next) => {
  try {
    const data =await Seller.findByIdAndUpdate(req.params.sellerId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong",
      data: null,
      error: err,
    });
  }
};

// code to delete seller

exports.delete_seller = async (req, res, next) => {
  try {
    const data =await Seller.findByIdAndDelete(req.params.sellerId);
    if (!data) {
      res.status(404).json({
        message: "No seller found",
      });
    } else {
      res.status(200).json({
        code: 1,
        message: "delete request for seller performed successfully",
        data: data,
        error: null,
      });
    }
  } catch (err) {
    res.status(500).json({
        code:0,
        message:"Somthing went wrong",
        data:null,
        error:err
       })
  }
};
