import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CourseStatus } from "./course-status.type";
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesService {
    private repo;
    constructor(repo: Repository<Course>);
    findApproved(): Promise<Course[]>;
    findPending(): Promise<Course[]>;
    findByInstructor(instructorId: number): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    create(dto: CreateCourseDto, instructorId: number, instructorName: string): Promise<Course>;
    update(id: number, dto: UpdateCourseDto, instructorId: number): Promise<Course>;
    delete(id: number, instructorId: number): Promise<{
        message: string;
    }>;
    updateStatus(id: number, status: CourseStatus): Promise<Course>;
}
