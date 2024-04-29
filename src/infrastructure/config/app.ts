import express, { application } from 'express';
import cors from 'cors';
import http from 'http';
import userRoute from '../router/userRoute';
import teacherRoute from '../router/teacherRoutes';
import adminRoute from '../router/adminRoutes';

const morgan = require("morgan");




const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.options("*",cors());
app.use(morgan('dev'));
app.use("/api/user",userRoute);
app.use("/api/teacher",teacherRoute);
app.use("/api/admin",adminRoute);
const httpServer = http.createServer(app);

export {httpServer}