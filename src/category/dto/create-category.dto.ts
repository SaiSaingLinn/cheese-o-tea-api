import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3, { message: 'Category name must be at least 3 characters long.' })
  readonly name: string;
}
