import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './User';

@Entity()
export class AuthenticationSession {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    authentication_session_id: string;

    @Column({ type: 'varchar' })
    @IsString()
    user_session_id: string;

    @OneToOne(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;
}