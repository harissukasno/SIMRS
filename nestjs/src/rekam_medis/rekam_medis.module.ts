import { Module } from '@nestjs/common';
import { RekamMedisService } from './rekam_medis.service';
import { RekamMedisController } from './rekam_medis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RekamMedis } from './rekam_medis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RekamMedis])],
  controllers: [RekamMedisController],
  providers: [RekamMedisService],
  exports: [RekamMedisService]
})
export class RekamMedisModule {}
