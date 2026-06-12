import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common'
import { CoursesService } from './courses.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) { }

  // Public: Get all approved courses
  @Get()
  getApprovedCourses() {
    return this.coursesService.findApproved()
  }

  // Admin: Get pending courses
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('pending')
  getPendingCourses() {
    return this.coursesService.findPending()
  }

  // Instructor: Get my courses
  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyCourses(@Req() req: any) {
    return this.coursesService.findByInstructor(req.user.userId)
  }

  // Instructor: Create a course
  @UseGuards(JwtAuthGuard)
  @Post()
  createCourse(@Body() dto: CreateCourseDto, @Req() req: any) {
    return this.coursesService.create(dto, req.user.userId, req.user.name || 'Unknown')
  }

  // Public: Get single course by ID
  @Get(':id')
  getCourse(@Param('id') id: number) {
    return this.coursesService.findOne(id)
  }

  // Instructor: Update my course
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCourse(@Param('id') id: number, @Body() dto: UpdateCourseDto, @Req() req: any) {
    return this.coursesService.update(id, dto, req.user.userId)
  }

  // Instructor: Delete my course
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCourse(@Param('id') id: number, @Req() req: any) {
    return this.coursesService.delete(id, req.user.userId)
  }

  // Admin: Approve course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/approve')
  approveCourse(@Param('id') id: number) {
    return this.coursesService.updateStatus(id, 'APPROVED')
  }

  // Admin: Reject course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/reject')
  rejectCourse(@Param('id') id: number) {
    return this.coursesService.updateStatus(id, 'REJECTED')
  }
}

