import { Module } from '@nestjs/common';
import { PasienController } from './pasien.controller';
import { PasienService } from './pasien.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pasien } from './pasien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pasien])],
  controllers: [PasienController],
  providers: [PasienService],
  exports: [PasienService]
})
export class PasienModule {}
