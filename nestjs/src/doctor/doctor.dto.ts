import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateDoctorDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly specialization: string;

    @IsInt()
    readonly experience: number;
}

export class UpdateDoctorDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly specialization?: string;

    @IsOptional()
    @IsInt()
    readonly experience?: number;
}