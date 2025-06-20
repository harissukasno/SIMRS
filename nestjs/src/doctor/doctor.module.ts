import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor])],
    controllers: [DoctorController],
    providers: [DoctorService,
                CreateDoctorDto,
                UpdateDoctorDto
    ],
    exports: [DoctorService],
})
export class DoctorModule {}
