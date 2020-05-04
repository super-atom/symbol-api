import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, Index } from "typeorm";
import { RelationLoader } from "typeorm/query-builder/RelationLoader";
import { RelationIdLoader } from "typeorm/query-builder/RelationIdLoader";
import { validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, IsNotEmpty, Min, Max } from "class-validator";


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    user_id: string;

    @Index({ unique: true })
    @Column('varchar', {length: 10})
    @IsNotEmpty()
    @Min(3)
    @Max(10)
    @Length(10)
    user_login_id: string;

    @Column('binary', {length: 60})
    @IsNotEmpty()
    user_password: string;

    @Column('mediumint', {width:9, nullable: true, default: 0})
    @IsNotEmpty()
    user_contribute_point: number;

    @Column({type:'datetime', nullable: true, default: null})
    @IsDate()
    user_dropout_date: Date;

    @Column({type:'datetime', nullable: true})
    @IsDate()
    user_signup_date: Date;
}