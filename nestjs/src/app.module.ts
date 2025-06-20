import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { PelayananModule } from './palayanan/pelayanan.module';
import { AntrianModule } from './antrian/antrian.module';
import { WebsocketgatewayModule } from './websocketgateway/websocketgateway.module';
import { KasurModule } from './kasur/kasur.module';
import { RekamMedisModule } from './rekam_medis/rekam_medis.module';
import { PasienModule } from './pasien/pasien.module';

@Module({
  imports: [AuthModule, UsersModule,PatientModule,DoctorModule, PelayananModule,
            AntrianModule,WebsocketgatewayModule,KasurModule,RekamMedisModule,
            PasienModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // Specify the database type
      host: 'mysql_db', // Database host
      port: 3306, // Default MySQL port
      username: 'root', // Your MySQL username
      password: 'root', // Your MySQL password
      database: 'simrs', // Your database name
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Use this in development to auto-sync schema (disable in production)
    }),    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
