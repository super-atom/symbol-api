import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, Index, BeforeInsert, BeforeUpdate } from "typeorm";
import { RelationLoader } from "typeorm/query-builder/RelationLoader";
import { RelationIdLoader } from "typeorm/query-builder/RelationIdLoader";
import { IsNotEmpty } from "class-validator";

@Entity()
export class ProfileType {
    @PrimaryColumn()
    @Column('tinyint', { width: 1 })
    @IsNotEmpty()
    profile_type: string;

    @IsNotEmpty()
    profile_type_name: string;
}