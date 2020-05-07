import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { RelationLoader } from "typeorm/query-builder/RelationLoader";
import { RelationIdLoader } from "typeorm/query-builder/RelationIdLoader";
import { validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, IsNotEmpty, Min, Max } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Human } from "./Human";
import { ProfileType } from "./ProfileType";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    profile_id: string;

    @IsNotEmpty()
    profile_type: number;

    @Column()
    activity_name: string;

    @Column()
    native_activity_name: string;

    @Column()
    profile_description: string;

    @OneToOne(() => ProfileType)
    @JoinColumn()
    user_type: ProfileType;

    @ManyToOne(() => Human, human => human.profiles)
    @JoinColumn()
    human: Human;
}