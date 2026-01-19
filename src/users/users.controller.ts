import { Controller, Post, Body, Res, Get, Req, UseGuards, Patch } from '@nestjs/common'
import { UsersService } from './users.service'
import type { Response } from 'express'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'

@Controller('users')
export class UsersController {
constructor(private usersService: UsersService) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN")
@Get("instructors")
findInstructors() {
  return this.usersService.findByRole("INSTRUCTOR")
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN")
@Get("students")
findStudents() {
  return this.usersService.findByRole("STUDENT")
}


@UseGuards(JwtAuthGuard)
@Get("me")
getMyProfile(@Req() req) {
return this.usersService.findById(req.user.userId)
}

@UseGuards(JwtAuthGuard)
@Patch("me")
updateMyProfile(@Req() req, @Body() body) {
return this.usersService.update(req.user.userId, body)
}

}