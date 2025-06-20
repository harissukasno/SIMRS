import { Module } from '@nestjs/common';
import { AntrianController } from './antrian.controller';
import { AntrianService } from './antrian.service';
import { Antrian } from './antrian.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAntrianDto } from './antrian.dto';
import { WebsocketGateway } from '../websocketgateway/websocket';

@Module({
  imports: [TypeOrmModule.forFeature([Antrian])], // Register the User entity
  controllers: [AntrianController],
  providers: [AntrianService, CreateAntrianDto, WebsocketGateway],
  exports: [AntrianService]
})
export class AntrianModule {}
