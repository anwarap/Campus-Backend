import CourseInterface from "../../usecase/interface/courseInterface";
import CourseModel from "../database/courseModel";
import Course from "../../domain/course";


class CourseRepository implements  CourseInterface {

    async createCourse(course: Course): Promise<any> {
        try {
            const Course =  new CourseModel(course);
            const savedCourse = await Course.save();
            return savedCourse;
        } catch (error) {
            console.log(error)
        }
    }
}



export default CourseRepository;