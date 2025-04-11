import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('admin')
@Controller({ version: '1', path: 'admin' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Since in requirement doc not included for authentication logic, 
  // I will just add a simple authentication logic for admin login
  @Post('login')
  login(@Body() { email, password }: { email: string; password: string }) {
    if (!this.adminService.validateAdmin(email, password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      data: {
        name: "Admin",
      },
      message: 'Login successful',
    };
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
