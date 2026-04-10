
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // CREATE → ADMIN only
  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  // READ ALL → ADMIN & PETUGAS
  @Get()
  @Roles('ADMIN', 'PETUGAS')
  findAll() {
    return this.studentsService.findAll();
  }

  // READ ONE → ADMIN & PETUGAS
  @Get(':id')
  @Roles('ADMIN', 'PETUGAS')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(Number(id));
  }

  // UPDATE (PUT) → ADMIN only
  @Put(':id')
  @Roles('ADMIN')
  updatePut(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(Number(id), dto);
  }

  // UPDATE (PATCH) → ADMIN only
  @Patch(':id')
  @Roles('ADMIN')
  updatePatch(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(Number(id), dto);
  }

  // DELETE → ADMIN only
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}

