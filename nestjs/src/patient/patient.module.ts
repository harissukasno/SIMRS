import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService,
              CreatePatientDto,
              UpdatePatientDto
  ],
  exports: [PatientService],
})
export class PatientModule {}
