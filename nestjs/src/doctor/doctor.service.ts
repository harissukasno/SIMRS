import { Injectable } from '@nestjs/common';
import { Doctor } from './doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
    ) {}

    async findAllDoctors(): Promise<Doctor[]> {
        return this.doctorRepository.find();
    }
    
    async countDoctors(): Promise<number> {
        return this.doctorRepository.count();
    }
}
