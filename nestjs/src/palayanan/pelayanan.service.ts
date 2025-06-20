import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Pelayanan } from './pelayanan.entity';

@Injectable()
export class PelayananService {
    constructor(
        @InjectRepository(Pelayanan)
        private palayananRepository: Repository<Pelayanan>,
    ){}

    async findAllPelayanan(): Promise<Pelayanan[]> {
        return this.palayananRepository.find();
    }

    async createPelayanan(pelayanan: Pelayanan): Promise<Pelayanan> {
        return this.palayananRepository.save(pelayanan);
    }
}
