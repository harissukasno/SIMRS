import { IsString } from 'class-validator';

export class createPelayananDto {
    @IsString()
    readonly jenis_pelayanan: string;
}