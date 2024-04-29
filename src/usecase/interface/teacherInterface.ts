import Teacher from '../../domain/teacher';

interface TeacherInterface {
    saveTeacher(teacher: Teacher):Promise<any>;
    findByEmail(email: string): Promise<any>;
    findAllTeachers(): Promise<any>;
    findTeacherById(id:string): Promise<any>;
    findAndUpdate(teacher: Teacher): Promise<any>;
}


export default TeacherInterface;