import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { CourseStatus } from "./course-status.type"

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  shortDescription: string

  @Column()
  instructorId: number

  @Column()
  instructorName: string

  @Column()
  price: number

  @Column({ default: "APPROVED" })
  status: "PENDING" | "APPROVED" | "REJECTED"
}
