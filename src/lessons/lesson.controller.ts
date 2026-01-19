import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common'
import { LessonsService } from './lessons.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'

@Controller('lessons')
@UseGuards(JwtAuthGuard) // 🔒 must be logged in
export class LessonsController {
  constructor(private lessonsService: LessonsService) { }

  /**
   * GET /lessons/:courseId
   * Admin -> all lessons
   * Student -> only if purchased
   * Instructor -> only their own courses
   */
  @Get(':courseId')
  async getLessons(
    @Param('courseId') courseId: number,
    @Req() req: any,
  ) {
    // 🔐 verify role + purchase
    await this.lessonsService.verifyLessonAccess(
      req.user,
      Number(courseId),
    )

    // 📘 return lessons
    return this.lessonsService.getLessonsByCourse(Number(courseId))
  }

  // Instructor: Create a lesson
  @UseGuards(RolesGuard)
  @Roles('INSTRUCTOR')
  @Post()
  createLesson(@Body() dto: CreateLessonDto, @Req() req: any) {
    return this.lessonsService.create(dto, req.user.userId)
  }

  // Instructor: Update a lesson
  @UseGuards(RolesGuard)
  @Roles('INSTRUCTOR')
  @Patch(':id')
  updateLesson(
    @Param('id') id: number,
    @Body() dto: UpdateLessonDto,
    @Req() req: any,
  ) {
    return this.lessonsService.update(id, dto, req.user.userId)
  }

  // Instructor: Delete a lesson
  @UseGuards(RolesGuard)
  @Roles('INSTRUCTOR')
  @Delete(':id')
  deleteLesson(@Param('id') id: number, @Req() req: any) {
    return this.lessonsService.delete(id, req.user.userId)
  }
}

