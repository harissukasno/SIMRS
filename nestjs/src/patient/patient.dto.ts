import { IsString, IsOptional} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  readonly nama: string;

  @IsString()
  readonly tanggal_lahir: Date;

  @IsString()
  readonly jenis_kelamin: string;

  @IsString()
  readonly alamat: string;

  @IsString()
  readonly no_telepon: string;
  
  @IsString()
  readonly tipe_perawatan: string;
  }
  
  // filepath: /home/yaris/Documents/owning/nestjs/simrs/src/dto/update-patient.dto.ts
  export class UpdatePatientDto {
    @IsOptional()
    @IsString()
    readonly nama?: string;

    @IsOptional()
    @IsString()
    readonly tanggal_lahir?: Date;

    @IsOptional()
    @IsString()
    readonly jenis_kelamin?: string;

    @IsOptional()
    @IsString()
    readonly alamat?: string;

    @IsOptional()
    @IsString()
    readonly no_telepon?: string;

    @IsOptional()
    @IsString()
    readonly tipe_perawatan?: string;
  }