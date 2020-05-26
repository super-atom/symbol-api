import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

@Entity()
export class ArtistCommon {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    artist_id: string;

    @Column({ type: 'datetime', nullable: true, default: null })
    @IsDate()
    artist_activity_period_start: Date;

    @Column({ type: 'datetime', nullable: true, default: null })
    @IsDate()
    artist_activity_period_end: Date;

    @Column('tinyint', { width: 3, unsigned: true })
    @IsNumber()
    height: number;
}