import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    getApprovedCourses(): Promise<import("./course.entity").Course[]>;
    getPendingCourses(): Promise<import("./course.entity").Course[]>;
    getMyCourses(req: any): Promise<import("./course.entity").Course[]>;
    createCourse(dto: CreateCourseDto, req: any): Promise<import("./course.entity").Course>;
    getCourse(id: number): Promise<import("./course.entity").Course>;
    updateCourse(id: number, dto: UpdateCourseDto, req: any): Promise<import("./course.entity").Course>;
    deleteCourse(id: number, req: any): Promise<{
        message: string;
    }>;
    approveCourse(id: number): Promise<import("./course.entity").Course>;
    rejectCourse(id: number): Promise<import("./course.entity").Course>;
}
