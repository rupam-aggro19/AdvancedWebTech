import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Course } from '../courses/course.entity';
import { Purchase } from '../purchases/purchase.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsService {
    private lessonRepo;
    private courseRepo;
    private purchaseRepo;
    constructor(lessonRepo: Repository<Lesson>, courseRepo: Repository<Course>, purchaseRepo: Repository<Purchase>);
    verifyLessonAccess(user: any, courseId: number): Promise<void>;
    getLessonsByCourse(courseId: number): Promise<Lesson[]>;
    create(dto: CreateLessonDto, instructorId: number): Promise<Lesson>;
    update(id: number, dto: UpdateLessonDto, instructorId: number): Promise<Lesson>;
    delete(id: number, instructorId: number): Promise<{
        message: string;
    }>;
}
