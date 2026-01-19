import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import type { UserRole } from "./user-role.type"


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: 'text' })
  role: UserRole
}
