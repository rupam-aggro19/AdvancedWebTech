import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'
import { Course } from '../courses/course.entity'

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  student: User

  @ManyToOne(() => Course)
  course: Course
}
