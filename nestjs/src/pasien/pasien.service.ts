import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pasien } from './pasien.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PasienService {
    constructor(
        @InjectRepository(Pasien)
        private pasienRepository: Repository<Pasien>,
    ) {}

    async getPasienCount(): Promise<{ message: string; count: number }> {
        const count = await this.pasienRepository.count();
        return { message: 'Total pasien count', count };
    }

    async findAllPasien(): Promise<Pasien[]> {
        return this.pasienRepository.find();
    }

    async findOnePasien(id: number): Promise<{ message: string; pasien?: Pasien }> {
        const pasien = await this.pasienRepository.findOne({ where: { id } });
        if (!pasien) {
            return { message: 'User not found' };
        }
        return { message: 'User found', pasien };
    }    
}
