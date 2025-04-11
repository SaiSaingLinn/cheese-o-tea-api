import {
  IsString,
  IsPhoneNumber,
  IsArray,
  IsOptional,
  IsUUID,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @Matches(/^(099|99)\d{7,9}$/, {
    message: 'Phone number must start with 099 or 99',
  })
  @ApiProperty({
    description: 'Phone',
  })
  phone: string;

  @IsString()
  @MinLength(6, { message: 'OTP is invalid.' })
  @ApiProperty({
    description: 'OTP',
  })
  otp: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Status',
  })
  status?: string;

  @IsArray()
  @Type(() => String)
  @ApiProperty({
    description: 'Itmes',
  })
  items: string[];

  @IsUUID()
  @ApiProperty({
    description: 'CategoryId',
  })
  categoryId: string;
}
