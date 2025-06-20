import { Body, Controller, Get, Post } from '@nestjs/common';
import { PelayananService } from './pelayanan.service';

@Controller('pelayanan')
export class PelayananController {
    constructor(private readonly pelayananService: PelayananService,) {}

    @Get()
    getAllLayanan() {
        return this.pelayananService.findAllPelayanan();
    }

    @Post()
    createPelayanan(@Body() createPelayananDto: any) {
        return this.pelayananService.createPelayanan(createPelayananDto);
    }
}
