import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

@Entity()
export class UserType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    @IsNumber()
    user_type: number;

    @Column('varchar', { length: 50 })
    @IsNotEmpty()
    @IsString()
    user_type_name: string;
}