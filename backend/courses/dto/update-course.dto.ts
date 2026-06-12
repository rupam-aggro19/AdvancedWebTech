import { IsString, IsNumber, MinLength, Min, IsOptional } from 'class-validator'

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    title?: string

    @IsOptional()
    @IsString()
    @MinLength(10)
    shortDescription?: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number
}
