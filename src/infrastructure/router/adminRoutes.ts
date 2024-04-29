import { adminController } from "../utils/controlers";

import express from "express";
const adminRoute = express.Router();

adminRoute.post("/login",(req, res) => adminController.adminLogin(req, res));
adminRoute.get("/users",(req, res) => adminController.getUsers(req, res));
adminRoute.get("/teachers",(req, res) => adminController.getTeachers(req, res));
adminRoute.post("/block-user/:id",(req, res) => adminController.blockUser(req, res));
adminRoute.post("/block-teacher/:id",(req, res) => adminController.blockTeacher(req, res));




export default adminRoute;


