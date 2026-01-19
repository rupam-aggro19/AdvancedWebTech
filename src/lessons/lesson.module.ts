import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonsService } from './lessons.service'
import { LessonsController } from './lesson.controller'
import { Lesson } from './lesson.entity'
import { Course } from '../courses/course.entity'
import { Purchase } from '../purchases/purchase.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Course, Purchase]),
  ],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
