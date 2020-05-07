import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, Index, OneToOne, JoinColumn } from "typeorm";
import { RelationLoader } from "typeorm/query-builder/RelationLoader";
import { RelationIdLoader } from "typeorm/query-builder/RelationIdLoader";
import { validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, IsNotEmpty, IsString, Min, Max } from "class-validator";
import { UserType } from './UserType';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @Index({ unique: true })
    @Column('varchar', { length: 10 })
    @IsNotEmpty()
    @IsString()
    user_login_id: string;

    @Index({ unique: true })
    @Column('varchar', { length: 50 })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    user_email: string;

    @Column('binary', { length: 60 })
    @IsNotEmpty()
    @IsString()
    user_password: string;

    @Column('mediumint', { width: 9, nullable: true, default: 0 })
    @IsNotEmpty()
    @IsInt()
    user_contribute_point: number;

    @Column({ type: 'datetime', nullable: true, default: null })
    @IsDate()
    user_dropout_date: Date;

    @Column({ type: 'datetime', nullable: true })
    @IsDate()
    user_signup_date: Date;

    @OneToOne(() => UserType)
    @JoinColumn()
    user_type: UserType;
}