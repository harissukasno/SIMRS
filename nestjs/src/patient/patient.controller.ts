import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    // Add routes here
    @Get()
    getAllPatients() {
        return this.patientService.findAllPatients();
    }

    @Get(':id')
    getPatientById(@Param('id') id: number) {
        return this.patientService.findOnePatient(id);
    }
    
    @Post()
    createPatient(@Body() createPatientDto: any) {
        return this.patientService.createPatient(createPatientDto);
    }

}
