import { Controller, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    // Add routes here
    @Get()
    findAll(){
        return this.doctorService.findAllDoctors();
    }

    @Get('count')
    countDoctors() {
        return this.doctorService.countDoctors();
    }
}
