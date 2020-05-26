import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class PostType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    post_type: number;

    @Column('varchar', { length: 50 })
    @IsNotEmpty()
    @IsString()
    post_type_name: string;
}