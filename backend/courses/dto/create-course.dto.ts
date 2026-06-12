import { IsString, IsNumber, MinLength, Min } from 'class-validator'

export class CreateCourseDto {
    @IsString()
    @MinLength(5)
    title: string

    @IsString()
    @MinLength(10)
    shortDescription: string

    @IsNumber()
    @Min(0)
    price: number
}
