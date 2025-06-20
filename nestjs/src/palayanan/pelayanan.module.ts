import { Module } from '@nestjs/common';
import { PelayananService } from './pelayanan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelayanan } from './pelayanan.entity';
import { PelayananController } from './pelayanan.controller';
import { createPelayananDto } from './pelayanan.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Pelayanan])],
  controllers: [PelayananController],
  providers: [PelayananService,
              createPelayananDto
  ],
  exports: [PelayananService],
})
export class PelayananModule {}
