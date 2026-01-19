import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10)

    return this.usersService.create({
      ...data,
      password: hashed,
    })
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException()

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) throw new UnauthorizedException()

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      name: user.name, // Include user name for instructor courses
    })

    return {
      token,
      role: user.role,
    }
  }
}

