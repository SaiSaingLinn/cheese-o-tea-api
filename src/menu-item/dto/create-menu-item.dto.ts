import { IsString, IsOptional, IsNumber, IsUUID, IsPositive, IsUrl } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number.' })
  readonly price: number;

  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  readonly imageUrl?: string;

  @IsUUID()
  readonly categoryId: string;
}