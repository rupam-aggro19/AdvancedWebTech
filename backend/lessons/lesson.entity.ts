import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Course } from '../courses/course.entity'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  videoUrl: string

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course
}
