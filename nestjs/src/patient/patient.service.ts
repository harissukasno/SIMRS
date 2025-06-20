import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

@Injectable()
export class PatientService {
    constructor(
      @InjectRepository(Patient)
      private patientRepository: Repository<Patient>      
    ) {}
    
    async findAllPatients(): Promise<Patient[]> {
      return this.patientRepository.find();
    }
  
    async findOnePatient(id: number): Promise<{ message: string; patient?: Patient }> {
      const patient = await this.patientRepository.findOne({ where: { id } });
      if (!patient) {
      return { message: 'User not found' };
      }
      return { message: 'User found', patient };
    }

    async createPatient(createPatientDto: CreatePatientDto): Promise<{ message: string; patient: Patient }> {
      const newPatient = this.patientRepository.create(createPatientDto);
      const savedPatient = await this.patientRepository.save(newPatient);
      return { message: 'Success in creating new patient', patient: savedPatient };
    }
  
    async updatePatient(id: number, updatePatientDto: UpdatePatientDto): Promise<{ message: string; patient: Patient }> {
      await this.patientRepository.update(id, updatePatientDto);
      const updatedPatient = await this.patientRepository.findOne({ where: { id } });
      return { message: 'Success in updating patient data', patient: updatedPatient };
    }
}
