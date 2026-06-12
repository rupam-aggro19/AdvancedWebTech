import { IsString, MinLength, IsOptional } from 'class-validator'

export class UpdateLessonDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    title?: string

    @IsOptional()
    @IsString()
    @MinLength(5)
    videoUrl?: string
}
