import { Request,Response } from "express";
import CourseUsecase from "../usecase/courseUsecase";
import Course from "../domain/course";
import CloudinarySetup from "../infrastructure/utils/cloudinarySetup";


class CourseController {
    constructor(
        private courseUsecase: CourseUsecase,
        private cloudinarySetup: CloudinarySetup
    ){}

    async createCourse(req: Request, res: Response){
        try {
  
            if(!req.file){
                return res.status(400).json({ message: "No file uploaded. Please upload a file." });
            }
            const image = await this.cloudinarySetup.upload(req.file.path,'cover')
            const  url = image?.secure_url || ""
            req.body.image =url
            const response = await this.courseUsecase.createCourse(req.body);
           if(response?.status){
            return res.status(response.status).json(response.data);
           }
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


export default CourseController;