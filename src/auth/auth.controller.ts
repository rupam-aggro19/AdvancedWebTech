import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import type { Response } from 'express'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Post("login")
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, role } = await this.authService.login(
      dto.email,
      dto.password,
    )

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
    })

    return { role } 
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return {
      userId: req.user.userId,
      role: req.user.role,
    }
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("jwt")
    return { message: "Logged out" }
  }


}
