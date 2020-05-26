import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { ProfileType } from "./ProfileType";
import { PublicationData } from './PublicationData';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    profile_id: string;

    @Column('varchar', { length: 50 })
    @IsNotEmpty()
    @IsString()
    activity_name: string;

    @Column('varchar', { length: 50 })
    @IsString()
    native_activity_name: string;

    @Column('varchar', { length: 500 })
    @IsString()
    profile_description: string;

    @OneToOne(type => ProfileType)
    @JoinColumn()
    user_type: ProfileType;

    @OneToOne(type => PublicationData)
    @JoinColumn()
    publication_id: PublicationData;
}