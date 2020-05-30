import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { IsDate, IsNotEmpty, IsString, IsBoolean } from "class-validator";
import { User } from './User';

@Entity()
export class HistoricalData {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    historical_data_id: string;

    @Column('mediumint', { nullable: true })
    @IsNotEmpty()
    ip: number;

    @Column('tinyint', { width: 1 })
    @IsNotEmpty()
    action_type: number;

    @Column('datetime', { nullable: true })
    @IsNotEmpty()
    @IsDate()
    action_occurred_datetime: Date;

    @Column('boolean', { default: false, nullable: true })
    @IsNotEmpty()
    @IsBoolean()
    is_hide: boolean;

    @Column('boolean', { default: false, nullable: true })
    @IsNotEmpty()
    @IsBoolean()
    is_delete: boolean;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn()
    user: User;
}