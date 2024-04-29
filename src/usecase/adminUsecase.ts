import IAdmin from "../domain/admin";
import AdminInterface from "./interface/adminInterface";
import Encrypt from "../infrastructure/utils/hashPassword";
import JwtToken from "../infrastructure/utils/jwt";
import UserInterface from "./interface/userInterface";
import TeacherInterface from "./interface/teacherInterface";


class AdminUsecase {
    constructor(
        private adminInterface: AdminInterface,
        private Encrypt: Encrypt,
        private jwtToken: JwtToken,
        private userInterface: UserInterface,
        private teacherInterface: TeacherInterface
    ){}

    async adminLogin(admin:IAdmin){
        try {
            const adminFound = await this.adminInterface.findByEmail(admin.email);;
            if(!adminFound){
                return {
                    status:401,
                    data:{
                        message:"Admin not found"
                    }
                }
            }
            const passwordMatch = await this.Encrypt.compare(admin.password,adminFound.password);
            if(!passwordMatch){
                return {
                    status:401,
                    data:{
                        message:"Authentication Failed"
                    }
                }
            }

            const accessToken = await this.jwtToken.generateAccessToken(adminFound._id);
            const refreshToken = await this.jwtToken.generateRefreshToken(adminFound._id);

            return {
                status:200,
                data:{
                    adminData:adminFound,
                    accessToken,
                    refreshToken,
                }
            }
        } catch (error) {
            return {
                status: 400,
                data: error,
              };
        }
    }

    async getUsers(){
        try {
            const userList = await this.userInterface.findAllUsers();
            if(userList){
                return {
                    status:200,
                    data:userList
                }
            }else{
                return {
                    status:404,
                    data:'No user found'
                }
            }
        } catch (error) {
            return {
                status: 400,
                data: error,
              };
        }
    }

    async getTeachers(){
        try {
            const teachersList = await this.teacherInterface.findAllTeachers();
            if(teachersList){{
                return {
                    status:200,
                    data:teachersList
                }
            }}else{
                return {
                    status:404,
                    data:'No Teachers found'
                }
            }
        } catch (error) {
            return {
                status: 400,
                data: error,
              };
        }
    }

    async blockUser(id:any){
        try {
            
            const user = await this.userInterface.findUserById(id);

            if(user){
                const {isBlocked, ...userData} = user.toObject();
                const blockedUser = {...userData, isBlocked:!user.isBlocked};
                console.log(blockedUser,'blocked user')
                await this.userInterface.findAndUpdate(blockedUser);
                return {
                    status:200,
                    data:blockedUser
                }
            }else{
                return {
                    status: 404,
                    data:"No user found"
                }
            }
        } catch (error) {
            return {
                status: 400,
                data: error,
            };
        }
    }

    async blockTeacher(id: any){
        try {
            
            const teacher = await this.teacherInterface.findTeacherById(id);
            
        if(teacher){
            const {isBlocked,...teacherData} = teacher.toObject();
            const blockTeacher = {...teacherData, isBlocked: !teacher.isBlocked};
            console.log(blockTeacher,'blocked')
            await this.teacherInterface.findAndUpdate(blockTeacher);
            return {
                status:200,
                data:blockTeacher
            }
        }else{
            return {
                status: 404,
                data:"No teacher found"
            }
        }
    } catch (error) {
        return {
            status: 400,
            data: error,
        };
    }
    }
}


export default AdminUsecase;