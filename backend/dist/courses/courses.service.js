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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
let CoursesService = class CoursesService {
    constructor(repo) {
        this.repo = repo;
    }
    findApproved() {
        return this.repo.find({ where: { status: 'APPROVED' } });
    }
    findPending() {
        return this.repo.find({ where: { status: 'PENDING' } });
    }
    findByInstructor(instructorId) {
        return this.repo.find({ where: { instructorId } });
    }
    async findOne(id) {
        const course = await this.repo.findOne({ where: { id } });
        if (!course) {
            throw new common_1.NotFoundException("Course not found");
        }
        return course;
    }
    async create(dto, instructorId, instructorName) {
        const course = this.repo.create({
            ...dto,
            instructorId,
            instructorName,
            status: 'APPROVED',
        });
        console.log('Creating course with status:', course.status);
        return this.repo.save(course);
    }
    async update(id, dto, instructorId) {
        const course = await this.findOne(id);
        if (course.instructorId !== instructorId) {
            throw new common_1.ForbiddenException("You can only update your own courses");
        }
        Object.assign(course, dto);
        return this.repo.save(course);
    }
    async delete(id, instructorId) {
        const course = await this.findOne(id);
        if (course.instructorId !== instructorId) {
            throw new common_1.ForbiddenException("You can only delete your own courses");
        }
        await this.repo.remove(course);
        return { message: "Course deleted successfully" };
    }
    async updateStatus(id, status) {
        const course = await this.repo.findOne({ where: { id } });
        if (!course) {
            throw new common_1.NotFoundException("Course not found");
        }
        course.status = status;
        return this.repo.save(course);
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map