require('dotenv').config()
const http = require('http')
const app=require('./app')
// let server = http.createServer((req,res)=>{
//     res.write("server created successfully")
//     res.end()
// })

let server = http.createServer(app)

let port = process.env.PORT || 8888
let host = process.env.HOST

server.listen(port,()=>{
    console.log(`Server gets started on ${host}:${port}`)
})