import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pasien {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nama_lengkap: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nama_panggilan: string;

    @Column({ type: 'date', nullable: false })
    tanggal_lahir: Date;

    @Column({ type: 'enum', enum: ['Male', 'Female'], nullable: false })
    jenis_kelamin: 'Male' | 'Female';

    @Column({ type: 'enum', enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], nullable: true })
    golongan_darah?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

    @Column({ type: 'varchar', length: 30, unique: true, nullable: true })
    nomor_identitas?: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    nomor_hp: string;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
    email?: string;

    @Column({ type: 'text', nullable: true })
    alamat?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    kontak_darurat_nama?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    kontak_darurat_hp?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    hubungan_dengan_pasien?: string;

    @Column({ type: 'text', nullable: true })
    riwayat_medis?: string;

    @Column({ type: 'text', nullable: true })
    alergi?: string;

    @Column({ type: 'text', nullable: true })
    obat_saat_ini?: string;

    @Column({ type: 'text', nullable: true })
    riwayat_medis_keluarga?: string;

    @Column({ type: 'text', nullable: true })
    status_vaksinasi?: string;

    @Column({ type: 'text', nullable: true })
    disabilitas?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    penyedia_asuransi?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    nomor_polis_asuransi?: string;

    @Column({ type: 'date', nullable: true })
    masa_berlaku_asuransi?: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}