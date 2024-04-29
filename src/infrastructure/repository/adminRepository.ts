import IAdmin from "../../domain/admin";
import AdminInterface from "../../usecase/interface/adminInterface";
import AdminModel from "../database/adminModel";

class AdminRepository implements AdminInterface{
     async findByEmail(email: string): Promise<any> {
        const adminFound = await AdminModel.findOne({email});
        return adminFound;
    }

     async findAdminById(admin: string): Promise<any> {
        const adminFound = await AdminModel.findById(admin);
        return adminFound;
    }

     async blockUserById(id: string): Promise<any> {
        const userFound = await AdminModel.findById(id);
        return userFound;
    }

    async blockTeacherById(id: string): Promise<any> {
        const teacherFound = await AdminModel.findById(id);
        return teacherFound;    
    }
}


export default AdminRepository;