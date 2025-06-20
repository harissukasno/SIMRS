import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  controllers: [UsersController],
  providers: [UsersService,
              CreateUserDto,
              UpdateUserDto],
  exports: [UsersService],
})
export class UsersModule {}
