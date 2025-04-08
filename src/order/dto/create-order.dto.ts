import { IsString, IsPhoneNumber, IsArray, IsOptional, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsPhoneNumber('MM', { message: 'Phone number must be valid and start with 099 or 99.' })
  phone: string;

  @IsString()
  @MinLength(6, { message: 'OTP is invalid.' })
  otp: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsArray()
  @Type(() => String)
  items: string[];

  @IsUUID()
  categoryId: string;
}
