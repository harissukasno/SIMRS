import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('kasur')
export class Kasur {
    @PrimaryGeneratedColumn()
    id_kasur: number;

    @Column()
    id_kamar: number;

    @Column()
    nama_kasur: string;

    @Column({
        type: 'enum',
        enum: ['Tersedia', 'Terisi'],
        default: 'Tersedia'
    })
    status: string;    
}