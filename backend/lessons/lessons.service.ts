import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from './lesson.entity'
import { Course } from '../courses/course.entity'
import { Purchase } from '../purchases/purchase.entity'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,
  ) { }

  /**
   * CORE ACCESS CONTROL LOGIC
   * Admin  -> always allowed
   * Student -> allowed only if purchased
   * Others -> forbidden
   */
  async verifyLessonAccess(user: any, courseId: number): Promise<void> {
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
    })

    if (!course) {
      throw new NotFoundException('Course not found')
    }

    // ✅ ADMIN: full access
    if (user.role === 'ADMIN') {
      return
    }

    // ✅ INSTRUCTOR: can access their own courses
    if (user.role === 'INSTRUCTOR' && course.instructorId === user.userId) {
      return
    }

    // ✅ STUDENT: must have purchased
    if (user.role === 'STUDENT') {
      const purchase = await this.purchaseRepo.findOne({
        where: {
          student: { id: user.userId },
          course: { id: courseId },
        },
      })

      if (!purchase) {
        throw new ForbiddenException(
          'You have not purchased this course',
        )
      }

      return
    }

    // ❌ Everyone else (Guest)
    throw new ForbiddenException('Access denied')
  }

  /**
   * Fetch lessons AFTER access is verified
   */
  async getLessonsByCourse(courseId: number) {
    return this.lessonRepo.find({
      where: { course: { id: courseId } },
      relations: ['course'],
    })
  }

  // Instructor: Create a lesson
  async create(dto: CreateLessonDto, instructorId: number) {
    const course = await this.courseRepo.findOne({
      where: { id: dto.courseId },
    })

    if (!course) {
      throw new NotFoundException('Course not found')
    }

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException('You can only add lessons to your own courses')
    }

    const lesson = this.lessonRepo.create({
      title: dto.title,
      videoUrl: dto.videoUrl,
      course: course,
    })

    return this.lessonRepo.save(lesson)
  }

  // Instructor: Update a lesson
  async update(id: number, dto: UpdateLessonDto, instructorId: number) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ['course'],
    })

    if (!lesson) {
      throw new NotFoundException('Lesson not found')
    }

    if (lesson.course.instructorId !== instructorId) {
      throw new ForbiddenException('You can only update lessons in your own courses')
    }

    Object.assign(lesson, dto)
    return this.lessonRepo.save(lesson)
  }

  // Instructor: Delete a lesson
  async delete(id: number, instructorId: number) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ['course'],
    })

    if (!lesson) {
      throw new NotFoundException('Lesson not found')
    }

    if (lesson.course.instructorId !== instructorId) {
      throw new ForbiddenException('You can only delete lessons in your own courses')
    }

    await this.lessonRepo.remove(lesson)
    return { message: 'Lesson deleted successfully' }
  }
}

