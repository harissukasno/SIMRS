import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kasur } from './kasur.entity';
import { KasurController } from './kasur.controller';
import { KasurService } from './kasur.service';

@Module({
    imports: [TypeOrmModule.forFeature([Kasur])],
    controllers: [KasurController],
    providers: [KasurService],
    exports: [KasurService],
})
export class KasurModule {}
