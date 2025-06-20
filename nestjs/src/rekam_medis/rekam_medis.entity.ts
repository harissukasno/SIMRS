import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RekamMedis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_pasien: number;

  @Column()
  id_dokter: number;

  @Column()
  tanggal_pemeriksaan: Date;

  @Column()
  keluhan: string;

  @Column()
  diagnosis: string;

  @Column()
  perawatan: string;

  @Column()
  rekomendasi: string;
  
  @Column()
  catatan_tambahan: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  updated_at: Date;
}