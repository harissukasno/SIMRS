import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  tanggal_lahir: Date;

  @Column()
  jenis_kelamin: string;

  @Column()
  alamat: string;

  @Column()
  no_telepon: string;
  
  @Column()
  tipe_perawatan: string;
  
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  updated_at: Date;
}