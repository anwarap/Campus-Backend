import { Request,Response } from "express";
import CourseUsecase from "../usecase/courseUsecase";
import Course from "../domain/course";
import CloudinarySetup from "../infrastructure/utils/cloudinarySetup";

interface UploadedFiles {
    cover?: Express.Multer.File[];
    preview?: Express.Multer.File[];
}

class CourseController {
    constructor(
        private courseUsecase: CourseUsecase,
        private cloudinarySetup: CloudinarySetup
    ){}


    async createCourse(req: Request, res: Response) {
        try {
            console.log(req.body,'request')
            const filesReq = req as Request & { files: UploadedFiles }; // Type assertion
            // console.log(filesReq.body,'fsfs');
            if (!filesReq.files) {
                return res.status(400).json({ message: "No file uploaded. Please upload a file." });
            }
    
            if (!filesReq.files.cover) {
                return res.status(400).json({ message: "No cover file uploaded. Please upload a cover file." });
            }
            if(!filesReq.files.preview){
                return res.status(400).json({ message: "No preview file uploaded. Please upload a cover file." });

            }
            const coverFile = filesReq.files.cover[0];
            const previewFile = filesReq.files.preview[0];

            const coverUploadResult = await this.cloudinarySetup.upload(coverFile.path, 'course_covers', 'image');
            const previewUploadResult = await this.cloudinarySetup.upload(previewFile.path, 'course_previews', 'video');
            // console.log(coverFile, ' coverFile');
            const courseData = {
                ...req.body,
                cover: coverUploadResult.secure_url,
                preview: previewUploadResult.secure_url,
                lessons: JSON.parse(req.body.lessons),
            };
            console.log(courseData, 'courseData');
            const response = await this.courseUsecase.createCourse(courseData);

            if (response?.status) {
                return res.status(response.status).json(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
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