import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsBoolean, IsNumber, IsDate, IsString } from "class-validator";

@Entity()
export class Human {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    human_id: string;

    @Column('tinyint', { width: 1 })
    @IsNumber()
    gender: number

    @Column('date')
    @IsDate()
    birthday: Date

    @Column('varchar', { length: 50 })
    @IsString()
    real_name: string

    @Column('varchar', { length: 50 })
    @IsString()
    birth_country: string

    @Column('varchar', { length: 50 })
    @IsString()
    birth_city: string

    @Column('varchar', { length: 50 })
    @IsString()
    activity_country: string

    @Column('varchar', { length: 50 })
    @IsString()
    current_live_city: string

    @Column('smallint', { unsigned: true })
    @IsNotEmpty()
    @IsNumber()
    popularity: number

    @Column('smallint', { unsigned: true })
    @IsNotEmpty()
    @IsNumber()
    influence: number

    @Column('smallint')
    @IsNotEmpty()
    reputation: number

    @Column('boolean', { default: false })
    @IsNotEmpty()
    @IsBoolean()
    isDead: boolean
}