import { promises } from "dns";
import Category from "../../domain/category";

interface CategoryInterface {
    createCategory(name: string): Promise<any>;
    findCategory(name: string): Promise<any>;
    getCategory(): Promise<any>;
}

export default CategoryInterface;