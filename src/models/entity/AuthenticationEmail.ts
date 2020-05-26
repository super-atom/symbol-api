import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { User } from './User';

@Entity()
export class AuthenticationEmail {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    authentication_email_id: string;

    @Column('tinyint', { width: 1 })
    @IsNumber()
    @IsNotEmpty()
    auth_type: number;

    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    auth_key: string;

    @Column({ type: 'datetime' })
    @IsDate()
    @IsNotEmpty()
    auth_generate_datetime: Date;

    @Column({ type: 'datetime', nullable: true, default: null })
    @IsDate()
    auth_use_datetime: Date;

    @OneToOne(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;
}