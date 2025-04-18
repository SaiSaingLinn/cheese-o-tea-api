import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, AdminModule, MenuItemModule, CategoryModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
