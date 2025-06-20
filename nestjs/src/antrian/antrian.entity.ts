import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('antrian')
export class Antrian{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_pasien: number;
    
    @Column()
    id_pelayanan: number;

    @Column()
    nomor_antrian: number;

    @Column({
        type: 'enum',
        enum: ['Menunggu', 'Dilayani', 'Selesai', 'Batal'],
        default: 'Menunggu'
    })
    status: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    waktu_checkin: Date;

    @Column('timestamp', { default: () => 'NULL', nullable: true })
    waktu_pelayanan: Date;

    @Column('timestamp', { default: () => 'NULL', nullable: true })
    waktu_selesai: Date;
}