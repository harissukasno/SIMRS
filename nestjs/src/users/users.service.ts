import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private createUserDto: CreateUserDto,
    private readonly jwtService: JwtService
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ message: string; token: string; ok: boolean }> {
    
    const user = await this.userRepository.findOne({ where: { email : loginUserDto.email } });

    if (user && user.password === loginUserDto.password) {
      const payload: any = {
        id: user.id,
        role: user.role,
      };

      if (user.id_pelayanan !== 0) {
        payload.id_pelayanan = user.id_pelayanan;
      }
      const token = await this.jwtService.sign(payload);
      return { message: 'Login success', token, ok: true };
    }

    throw new UnauthorizedException('Incorrect username or password.');
  }
  
  async create(createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return { message: 'Success in creating new user', user: savedUser };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string; user: User }> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return { message: 'Success in updating data', user: updatedUser };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: 'User successfully removed' };
  }
  
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

}
