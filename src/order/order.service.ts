import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { decrypt, encrypt } from 'src/common/utils/encryption.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  private readonly dummyOtp = '007007'; // Dummy OTP for testing

  validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^(099|99)\d{7,9}$/;
    return phoneRegex.test(phone);
  }

  validateOtp(otp: string): boolean {
    return otp === this.dummyOtp;
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      // Validate phone number format
      if (!this.validatePhoneNumber(createOrderDto.phone)) {
        throw new BadRequestException('Invalid phone number format');
      }

      // Validate otp number
      if (!this.validateOtp(createOrderDto.otp)) {
        throw new BadRequestException('Invalid OTP');
      }

      // encrpt phone with crypto
      const encryptedPhone = encrypt(createOrderDto.phone);

      // Store hashed OTP
      const hashedOtp = await bcrypt.hash(createOrderDto.otp, 10);

      const order = await this.prisma.order.create({
        data: {
          phone: encryptedPhone,
          otp: hashedOtp,
          items: {
            create: createOrderDto.items.map((id) => ({
              menuItem: { connect: { id } },
              quantity: 1,
            })),
          },
          categoryId: createOrderDto.categoryId,
          status: createOrderDto.status,
        },
      });

      return order;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      omit: {
        otp: true,
      },
      include: {
        category: true,
        items: {
          include: { menuItem: true },
        },
      },
    });

    return orders.map((order) => ({
      ...order,
      phone: order?.phone ? decrypt(order.phone) : null, // Decrypt phone number
    }));
  }

  async findOne(id: string) {
    return await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto, // Spread the DTO fields
        items: {
          connect: updateOrderDto.items?.map((itemId) => ({ id: itemId })), // Only connect items if provided
        },
      },
    });
  }
}
