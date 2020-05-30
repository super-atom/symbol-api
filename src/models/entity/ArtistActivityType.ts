import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class ArtistActivityType {
    @PrimaryColumn('tinyint', { width: 1 })
    @IsNotEmpty()
    artist_activity_type: number;

    @Column('varchar', { length: 10 })
    @IsNotEmpty()
    @IsString()
    artist_activity_type_name: string;
}