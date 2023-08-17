import fastify from "fastify";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const server = fastify({logger:true});
import indexRoute from "./src/routes/indexRoute.js";

const port = process.env.PORT || 3000;

server.register(indexRoute,{prefix: '/'});

server.listen({port: port},(error, address)=>{
    if(error){
        server.exit();
        console.log('error');
    }
    console.log(`server is running in ${address}`);
});