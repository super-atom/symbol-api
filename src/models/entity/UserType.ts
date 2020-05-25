import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class UserType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    user_type: number;

    @IsNotEmpty()
    @Column()
    user_type_name: string;
}