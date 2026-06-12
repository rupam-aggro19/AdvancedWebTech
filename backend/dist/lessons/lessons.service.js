"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lesson_entity_1 = require("./lesson.entity");
const course_entity_1 = require("../courses/course.entity");
const purchase_entity_1 = require("../purchases/purchase.entity");
let LessonsService = class LessonsService {
    constructor(lessonRepo, courseRepo, purchaseRepo) {
        this.lessonRepo = lessonRepo;
        this.courseRepo = courseRepo;
        this.purchaseRepo = purchaseRepo;
    }
    async verifyLessonAccess(user, courseId) {
        const course = await this.courseRepo.findOne({
            where: { id: courseId },
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (user.role === 'ADMIN') {
            return;
        }
        if (user.role === 'INSTRUCTOR' && course.instructorId === user.userId) {
            return;
        }
        if (user.role === 'STUDENT') {
            const purchase = await this.purchaseRepo.findOne({
                where: {
                    student: { id: user.userId },
                    course: { id: courseId },
                },
            });
            if (!purchase) {
                throw new common_1.ForbiddenException('You have not purchased this course');
            }
            return;
        }
        throw new common_1.ForbiddenException('Access denied');
    }
    async getLessonsByCourse(courseId) {
        return this.lessonRepo.find({
            where: { course: { id: courseId } },
            relations: ['course'],
        });
    }
    async create(dto, instructorId) {
        const course = await this.courseRepo.findOne({
            where: { id: dto.courseId },
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (course.instructorId !== instructorId) {
            throw new common_1.ForbiddenException('You can only add lessons to your own courses');
        }
        const lesson = this.lessonRepo.create({
            title: dto.title,
            videoUrl: dto.videoUrl,
            course: course,
        });
        return this.lessonRepo.save(lesson);
    }
    async update(id, dto, instructorId) {
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            relations: ['course'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        if (lesson.course.instructorId !== instructorId) {
            throw new common_1.ForbiddenException('You can only update lessons in your own courses');
        }
        Object.assign(lesson, dto);
        return this.lessonRepo.save(lesson);
    }
    async delete(id, instructorId) {
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            relations: ['course'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        if (lesson.course.instructorId !== instructorId) {
            throw new common_1.ForbiddenException('You can only delete lessons in your own courses');
        }
        await this.lessonRepo.remove(lesson);
        return { message: 'Lesson deleted successfully' };
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(purchase_entity_1.Purchase)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map