import { IsNumber, IsString } from 'class-validator';

export class CreateAntrianDto {
    @IsNumber()
    readonly id_pasien: number;

    @IsNumber()
    readonly id_pelayanan: number;

    @IsNumber()
    readonly nomor_antrian: number;
}

export class deteleAntrianDto {
    @IsNumber()
    readonly pelayanan: number;

    @IsNumber()
    readonly antrian: number;
}

export class UpdateAntrianDto {    
    @IsNumber()
    readonly id_pasien: number;

    @IsNumber()
    readonly id_pelayanan: number;

    @IsNumber()
    readonly nomor_antrian: number;

    @IsString()
    readonly status: string;
}