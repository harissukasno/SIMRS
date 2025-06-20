import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { PasienService } from './pasien.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/auth.guard'; // Adjust the import path as necessary

@Controller('pasien')
export class PasienController {
    constructor(private readonly pasienService: PasienService) {}

    // Add routes here
    // getAllPasien() {
    @UseGuards(AdminGuard)
    @Get()
    getAllPasien() {
        return this.pasienService.findAllPasien();
    }

    @Get('total_count')
    getPasienCount() {
        return this.pasienService.getPasienCount();
    }

    // getPasienById(id: number) {
    @Get(':id')
    getPasienById(@Param('id') id: number) {
        return this.pasienService.findOnePasien(id);
    }
}