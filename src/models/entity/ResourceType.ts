import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class ResourceType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    resource_type: number;

    @Column('varchar', { length: 50 })
    @IsString()
    @IsNotEmpty()
    resource_type_name: string;
}