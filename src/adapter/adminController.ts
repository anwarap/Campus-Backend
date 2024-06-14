import { Request,Response } from "express";
import AdminUsecase from "../usecase/adminUsecase";

class AdminController {
    constructor(private adminUsecase: AdminUsecase){}

    async adminLogin(req: Request, res: Response){
        try {
            const admin = req.body;
            const adminData = await this.adminUsecase.adminLogin(admin);
            return res.status(adminData.status).json(adminData);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: (error as Error).message,
              });
        }
    }

    async getUsers(req: Request, res: Response){
        try {
            const userList = await this.adminUsecase.getUsers();
            return res.status(userList.status).json(userList.data);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: (error as Error).message,
              });
        }
    }

    async getTeachers(req: Request, res: Response){
        try {
            const teacherList = await this.adminUsecase.getTeachers();
            return res.status(teacherList.status).json(teacherList.data);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: (error as Error).message,
              }); 
        }
    }

    async blockUser(req: Request, res: Response){
        try {
            const user = await this.adminUsecase.blockUser(req?.params.id);
            
            return res.status(user.status).json(user.data);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: (error as Error).message,
              }); 
        }
    }

    async blockTeacher(req: Request, res: Response){
        try {
            const teacher = await this.adminUsecase.blockTeacher(req?.params.id);
            return res.status(teacher.status).json(teacher.data);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                error: (error as Error).message,
              }); 
        }
    }
}


export default AdminController;