import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { AdminGuard, AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // GLOBAL CONTROL
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ message: string; token: string; }> {
    return this.userService.login(loginUserDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<{ message: string; user: User }> {
    return this.userService.update(id, updateUserDto);
  }


  // ADMIN CONTROL
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.userService.remove(id);
  }
  
  @UseGuards(AdminGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

}
