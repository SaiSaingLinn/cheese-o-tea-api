import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  private readonly dummyOtp = '123456';

  // validatePhoneNumber(phone: string): boolean {
  //   const phoneRegex = /^(099\d{7}|99\d{8})$/;
  //   return phoneRegex.test(phone);
  // }

  // generateDummyOTP(): string {
  //   return Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
  // }

  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        phone: createOrderDto.phone,
        otp: createOrderDto.otp,
        items: {
          connect: createOrderDto.items.map((id) => ({ id })),
        },
        categoryId: createOrderDto.categoryId,
      },
    });
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: { items: true },
    });
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
