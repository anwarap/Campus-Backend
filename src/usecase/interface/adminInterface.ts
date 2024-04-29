import IAdmin from '../../domain/admin';

interface AdminInterface{
    findByEmail(email:string):Promise<any>;
    findAdminById(id:string):Promise<any>;
    blockUserById(id:string):Promise<any>;
    blockTeacherById(id:string):Promise<any>
}

export default AdminInterface;