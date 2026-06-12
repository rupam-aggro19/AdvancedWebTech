import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonsController {
    private lessonsService;
    constructor(lessonsService: LessonsService);
    getLessons(courseId: number, req: any): Promise<import("./lesson.entity").Lesson[]>;
    createLesson(dto: CreateLessonDto, req: any): Promise<import("./lesson.entity").Lesson>;
    updateLesson(id: number, dto: UpdateLessonDto, req: any): Promise<import("./lesson.entity").Lesson>;
    deleteLesson(id: number, req: any): Promise<{
        message: string;
    }>;
}
