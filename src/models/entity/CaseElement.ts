import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from './User';
import { HistoricalData } from './HistoricalData';

@Entity()
export class CaseElement {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    case_element_id: string;

    @IsNotEmpty()
    @Column('varchar', { length: 50 })
    case_element_name: string;

    @IsNotEmpty()
    @Column('datetime', { nullable: true })
    @IsDate()
    action_occurred_datetime: Date;

    @OneToMany(() => HistoricalData, historical_data => historical_data.historical_data_id)
    @JoinColumn()
    historical_data_id: HistoricalData;

    @OneToMany(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;
}