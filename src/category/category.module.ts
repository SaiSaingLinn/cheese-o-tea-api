import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
