import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kasur } from './kasur.entity';

@Injectable()
export class KasurService {
    constructor(
        @InjectRepository(Kasur)
        private kasurRepository: Repository<Kasur>
    ) {}

    async findAllKasur(): Promise<Kasur[]> {
        return this.kasurRepository.find();
    }
}
