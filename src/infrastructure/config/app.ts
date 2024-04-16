import express from 'express';
import http from 'http';
import userRoute from '../router/userRoute'




const app = express();

const httpServer = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use("/api/user",userRoute)


export {httpServer}