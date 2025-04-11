import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @ApiProperty({
    description: 'Name',
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description',
  })
  readonly description?: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number.' })
  @ApiProperty({
    description: 'Price',
  })
  readonly price: number;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  readonly imageUrl?: string;

  @IsUUID()
  @ApiProperty({
    description: 'categoryId',
  })
  readonly categoryId: string;
}
