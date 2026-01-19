import { IsString, IsNumber, MinLength } from 'class-validator'

export class CreateLessonDto {
    @IsString()
    @MinLength(3)
    title: string

    @IsString()
    @MinLength(5)
    videoUrl: string

    @IsNumber()
    courseId: number
}
