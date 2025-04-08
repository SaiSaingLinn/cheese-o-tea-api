import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MenuItemService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    return await this.prisma.menuItem.create({
      data: createMenuItemDto,
    });
  }

  async findAll() {
    return await this.prisma.menuItem.findMany({
      include: { category: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.menuItem.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return await this.prisma.menuItem.update({
      where: { id },
      data: updateMenuItemDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
