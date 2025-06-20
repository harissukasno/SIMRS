import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RekamMedisService } from './rekam_medis.service';
import { RekamMedis } from './rekam_medis.entity';

@Controller('rekam-medis')
export class RekamMedisController {
    constructor(private readonly rekamMedisService: RekamMedisService) {}

    // Add routes here
    // Example route
    @Get()
    getAllRekamMedis() {
        return this.rekamMedisService.findAllRekamMedis();
    }

    @Get(':id')
    getRekamMedisById(@Param('id') id: number): Promise<{ message: string; rekamMedis?: RekamMedis[] }> {
        return this.rekamMedisService.findOneRekamMedis(id);
    }    
}
