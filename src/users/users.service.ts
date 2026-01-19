import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import type { UserRole } from "./user-role.type"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.repo.save(user)
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } })
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      select: ["id", "name", "email", "role"], 
    })
  }

  findByRole(role: UserRole) {
    return this.repo.find({ where: { role } })
  }

  update(id: number, attrs: Partial<User>) {
    return this.repo.update(id, attrs)
  }
}
