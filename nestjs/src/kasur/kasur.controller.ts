import { Controller, Get } from '@nestjs/common';
import { KasurService } from './kasur.service';

@Controller('kasur')
export class KasurController {
    constructor(private readonly kasurService: KasurService) {}

    @Get()
    getAllKasur() {
        return this.kasurService.findAllKasur();
    }
}
