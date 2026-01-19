import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
export declare class Purchase {
    id: number;
    student: User;
    course: Course;
}
