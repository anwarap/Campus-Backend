import CategoryInterface from "../../usecase/interface/categoryInterface";
import CategoryModel from "../database/categoryModel";
import Category from "../../domain/category";

class CategoryRepository implements CategoryInterface {
    async createCategory(name:string): Promise<any> {
      try {
        // const Category = new CategoryModel(name);
        const Category = new CategoryModel({name});
        const savedCategory = await Category.save();
        return savedCategory
      } catch (error) {
        console.log(error)
      }
    }

    async findCategory(name: string): Promise<any> {
        try {
            const categoryFound = await CategoryModel.findOne({ name });
            return categoryFound;
        } catch (error) {
            console.log(error);
        }
    }

    async getCategory(): Promise<any> {
        try {
            const categoryFound = await CategoryModel.find({});
            // console.log(categoryFound,'sdfd')
            return categoryFound;
        } catch (error) {
            console.log(error);
        }
    }
}


export default CategoryRepository;