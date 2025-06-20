import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RekamMedis } from './rekam_medis.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RekamMedisService {
    constructor(
      @InjectRepository(RekamMedis)
      private rekamMedisRepository: Repository<RekamMedis>,
    ) {}

    async findAllRekamMedis(): Promise<RekamMedis[]> {
      return this.rekamMedisRepository.find();
    }
    
    async findOneRekamMedis(id: number): Promise<{ message: string; rekamMedis?: RekamMedis[] }> {
      const rekamMedis = await this.rekamMedisRepository.find({ where: { id_pasien: id } });
      if (rekamMedis.length === 0) {
        return { message: 'Rekam Medis not found' };
      }
      return { message: 'Rekam Medis found', rekamMedis };
    }
}
