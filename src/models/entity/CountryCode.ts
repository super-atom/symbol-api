import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsString } from "class-validator";

@Entity()
export class CountryCode {
    @PrimaryColumn('varchar', { length: 2 })
    @IsString()
    country_code: string;

    @Column('varchar', { length: 50 })
    @IsString()
    country_name: string;
}