import {Request, Response} from "express";
import CategoryUsecase from "../usecase/categoryUsecase";
import Category from "../domain/category";

class CategoryController {
    constructor(private categoryUsecase: CategoryUsecase){}

    async createCategory(req: Request, res: Response){
        try {
            const response = await this.categoryUsecase.createCategory(req.body);
            // console.log(response,'res')
            if(response){

                res.status(200).json(response.data)
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

    async getCategory(req: Request, res: Response){
        try {
            const response = await this.categoryUsecase.getCategory();
            // console.log(response,'rsese')
            res.status(200).json(response.data);
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


export default CategoryController;