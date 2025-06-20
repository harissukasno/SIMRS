import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AntrianService } from './antrian.service';
import { CreateAntrianDto, UpdateAntrianDto } from './antrian.dto';
import { Antrian } from './antrian.entity';
import { WebsocketGateway } from '../websocketgateway/websocket';

@Controller('antrian')
export class AntrianController {
    constructor(private readonly antrianService: AntrianService,
                private readonly websocketGateway: WebsocketGateway
    ) {}

    @Get()
    findAllAntrian(): Promise<Antrian[]> {
        return this.antrianService.findAllAntrian();
    }
    
    @Post()
    createAntrian(@Body() createAntrianDto: CreateAntrianDto): Promise<{ id_pasien: number, id_pelayanan: number, nomor_antrian: number }> {
        this.websocketGateway.sendUpdateToClient(createAntrianDto);
        return this.antrianService.createAntrian(createAntrianDto);
    }

    @Patch(':id')
    updateAntrian(@Param('id') id:number, @Body() updateAntrianDto: UpdateAntrianDto): Promise<{ message: string, antrian: Antrian }> {
        this.websocketGateway.sendUpdateToClient(updateAntrianDto);
        return this.antrianService.updateAntrian(id, updateAntrianDto);
    }

    @Get('count-per-month')
    countAntrianPerMonth(): Promise<number[]> {
        return this.antrianService.countAntrianPerMonth();
    }
}
