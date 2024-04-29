import Course from "../../domain/course";

interface CourseInterface {
    createCourse(course: Course): Promise<any>;
}

export default CourseInterface;