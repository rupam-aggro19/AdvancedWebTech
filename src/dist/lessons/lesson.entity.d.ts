import { Course } from '../courses/course.entity';
export declare class Lesson {
    id: number;
    title: string;
    videoUrl: string;
    course: Course;
}
