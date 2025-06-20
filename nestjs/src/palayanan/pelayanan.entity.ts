import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pelayanan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jenis_pelayanan: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
    updated_at: Date;
}