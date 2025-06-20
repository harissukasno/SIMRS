import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialty: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    gender: string;

    @Column()
    hire_date: Date;

    @Column('decimal')
    salary: number;
}