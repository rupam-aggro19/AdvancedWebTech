"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lessons_service_1 = require("./lessons.service");
const lesson_controller_1 = require("./lesson.controller");
const lesson_entity_1 = require("./lesson.entity");
const course_entity_1 = require("../courses/course.entity");
const purchase_entity_1 = require("../purchases/purchase.entity");
let LessonsModule = class LessonsModule {
};
exports.LessonsModule = LessonsModule;
exports.LessonsModule = LessonsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([lesson_entity_1.Lesson, course_entity_1.Course, purchase_entity_1.Purchase]),
        ],
        providers: [lessons_service_1.LessonsService],
        controllers: [lesson_controller_1.LessonsController],
    })
], LessonsModule);
//# sourceMappingURL=lesson.module.js.map