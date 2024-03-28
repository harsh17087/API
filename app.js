require('dotenv').config()
const express=require('express')
const app=express()
const morgan=require('morgan')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')
const employeeRoutes = require('./api/routes/employees')
const voucherRoutes = require('./api/routes/vouchers')
const examRoutes = require('./api/routes/exams')
const resultRoutes = require('./api/routes/results')

// app.use((req,res,next)=>{
//     res.status(200).json({
//         msg :"This is simple get request"
//     })
// })
app.use(morgan('dev'))


// mongoose connection string
mongoose.connect("mongodb+srv://harshraj17087:"+process.env.MONGO_ATLAS_PASS+"@cluster0.iy0trh4.mongodb.net/",{
    useNewUrlParser:true,

}).then(()=>{console.log('connected successfully with mongoDB atlas')})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Code to handle CORS error

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Header","Origin,X-Requested-Width,Content-Type,Accept,Authorization")
    res.header("Access-Control-Allow-Credentials",true)
    res.header("Access-Control-Allow-Method","PUT","POST","GET","DELETE")
    if(res.header==="OPTIONS"){
        res.header("Access-Control-Allow-Method","PUT","POST","GET","DELETE")
        return res.status(200).json()
    }
    next();
})

app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/users',userRoutes)
app.use('/employees',employeeRoutes)
app.use('/vouchers',voucherRoutes)
app.use('/exams',examRoutes)
app.use('/results',resultRoutes)

// Handle error using Middle
app.use((req,res,next)=>{
    const error = new Error('Route not found')
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:error.message
    })
})

module.exports = app