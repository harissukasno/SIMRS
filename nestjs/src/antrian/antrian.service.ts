import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Antrian } from './antrian.entity';
import { Repository } from 'typeorm';
import { CreateAntrianDto, UpdateAntrianDto } from './antrian.dto';

@Injectable()
export class AntrianService {
    constructor(
        @InjectRepository(Antrian)
        private antrianRepository: Repository<Antrian>    
    ) {}

    async findAllAntrian(): Promise<Antrian[]> {
        return this.antrianRepository.find();
    }
    
    async createAntrian(createAntrianDto: CreateAntrianDto): Promise<{ id_pasien: number, id_pelayanan: number, nomor_antrian: number }> {
        return this.antrianRepository.save(createAntrianDto);
    }

    async updateAntrian(id: number, updateAntrianDto: UpdateAntrianDto): Promise<{ message: string, antrian: Antrian }> {
        await this.antrianRepository.update(id, updateAntrianDto);
        const updatedAntrian = await this.antrianRepository.findOne({ where: { id } });
        return { message: 'Success in updating data', antrian: updatedAntrian };
    }

    async countAntrianPerMonth(): Promise<number[]> {
        const result = await this.antrianRepository
            .createQueryBuilder('antrian')
            .select("EXTRACT(MONTH FROM antrian.waktu_selesai)", "month")
            .addSelect("COUNT(*)", "count")
            .groupBy("month")
            .orderBy("month")
            .getRawMany();

        // Assuming you want an array where index 0 = January, 1 = February, etc.
        const counts = Array(12).fill(0);
        result.forEach(row => {
            const monthIndex = Number(row.month) - 1;
            counts[monthIndex] = Number(row.count);
        });
        return counts;
    }
}
