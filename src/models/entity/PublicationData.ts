import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";
import { HistoricalData } from './HistoricalData';

@Entity()
export class PublicationData {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    publication_id: string;

    @Column('tinyint', { width: 3 })
    @IsNumber()
    perfection: number;

    @Column('tinyint', { width: 1 })
    @IsNumber()
    publication_state: number;

    @Column('int')
    @IsNumber()
    view_count: number;

    @Column('boolean', { default: false })
    @IsBoolean()
    is_published: boolean;

    @Column('boolean', { default: false })
    @IsBoolean()
    is_temp_data: boolean;

    @OneToOne(() => HistoricalData, historical_data => historical_data.historical_data_id)
    @JoinColumn()
    historical_data: HistoricalData;
}