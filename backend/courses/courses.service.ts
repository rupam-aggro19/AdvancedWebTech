import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from './course.entity'
import { CourseStatus } from "./course-status.type"
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'


@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private repo: Repository<Course>,
  ) { }

  findApproved() {
    return this.repo.find({ where: { status: 'APPROVED' } })
  }

  findPending() {
    return this.repo.find({ where: { status: 'PENDING' } })
  }

  // Find courses by instructor ID
  findByInstructor(instructorId: number) {
    return this.repo.find({ where: { instructorId } })
  }

  // Find single course by ID
  async findOne(id: number) {
    const course = await this.repo.findOne({ where: { id } })
    if (!course) {
      throw new NotFoundException("Course not found")
    }
    return course
  }

  // Create a new course
  async create(dto: CreateCourseDto, instructorId: number, instructorName: string) {
    const course = this.repo.create({
      ...dto,
      instructorId,
      instructorName,
      status: 'APPROVED',
    })
    console.log('Creating course with status:', course.status) // DEBUG
    return this.repo.save(course)
  }

  // Update course (only by owner)
  async update(id: number, dto: UpdateCourseDto, instructorId: number) {
    const course = await this.findOne(id)

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException("You can only update your own courses")
    }

    Object.assign(course, dto)
    return this.repo.save(course)
  }

  // Delete course (only by owner)
  async delete(id: number, instructorId: number) {
    const course = await this.findOne(id)

    if (course.instructorId !== instructorId) {
      throw new ForbiddenException("You can only delete your own courses")
    }

    await this.repo.remove(course)
    return { message: "Course deleted successfully" }
  }

  async updateStatus(id: number, status: CourseStatus) {
    const course = await this.repo.findOne({ where: { id } })

    if (!course) {
      throw new NotFoundException("Course not found")
    }

    course.status = status
    return this.repo.save(course)
  }
}

