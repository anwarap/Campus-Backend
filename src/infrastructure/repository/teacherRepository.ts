import TeacherInterface from "../../usecase/interface/teacherInterface";
import TeacherModel from '../database/teacherModel';
import Teacher from "../../domain/teacher";


class TeacherRepository implements TeacherInterface {

    async saveTeacher(teacher: Teacher): Promise<any> {
        const Teacher = new TeacherModel(teacher);
        const savedTeacher = await Teacher.save()
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
        })
        return savedTeacher
    }
    
    async findByEmail(email: string): Promise<any> {
        const teacherFound = await TeacherModel.findOne({email});
        return teacherFound;
    }

    async findAllTeachers(): Promise<any> {
        const teacherList = await TeacherModel.find();
        return teacherList;
    }

    async findTeacherById(id: string): Promise<any> {
        const teacherFound = await TeacherModel.findById(id);
        return teacherFound;
    }

    async findAndUpdate(teacher: Teacher): Promise<any> {
        if(teacher._id){
            const updateTeacher = await TeacherModel.findByIdAndUpdate(teacher._id,teacher,{new:true});
            return updateTeacher
        }
    }
    
}



export default TeacherRepository;