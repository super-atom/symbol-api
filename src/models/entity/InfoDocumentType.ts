import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class InfoDocumentType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    info_document_type: number;

    @Column('varchar', { length: 50 })
    @IsString()
    @IsNotEmpty()
    info_document_type_name: string;
}