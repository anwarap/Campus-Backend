import Category from "../domain/category";
import CategoryInterface from "./interface/categoryInterface";

class CategoryUsecase {
    constructor(
        private categoryInterface: CategoryInterface
    ){}

    async createCategory(category:Category){
        try {
            let {name} = category
            name = name.toLowerCase()
            console.log(name,'name')
            const categoryExists = await this.categoryInterface.findCategory(name);
            if(categoryExists){
                return {
                    data:{message:"Category already exists"}
                }
            }
            const res = await this.categoryInterface.createCategory(name);
            // console.log(res,'ddd')
            return {
                status:200,
                data:res
            }
        } catch (error) {
            return {
                status: 400,
                data : error
            }
        }
    }

    async getCategory(){
        try {
            
            const res = await this.categoryInterface.getCategory();
            // console.log(res,'result')
            return{
                status:200,
                data:res
            }
        } catch (error) {
            return {
                status: 400,
                data : error
            }
        }
    }
}

export default CategoryUsecase;