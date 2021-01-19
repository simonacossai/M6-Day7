const express = require("express");

const server = express();
const listEndpoints = require('express-list-endpoints');

const cors  = require("cors")

const services = require("./services")

server.use(express.json())

server.use("/api",services)

console.log(listEndpoints(server));


server.use(cors())

const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.info(' Server is running on port ' + port )
});


server.on("error",(error)=>{
    console.error('Error : server is not running :  ' + error )
});