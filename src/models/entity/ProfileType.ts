import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class ProfileType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    profile_type: number;

    @Column('varchar', { length: 10 })
    @IsNotEmpty()
    @IsString()
    profile_type_name: string;
}