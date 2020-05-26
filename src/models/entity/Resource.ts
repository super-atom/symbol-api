import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { User } from './User';
import { ResourceType } from './ResourceType';

@Entity()
export class Resource {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    resource_id: string;

    @Column('varchar')
    @IsNotEmpty()
    @IsString()
    resource_filename: string;

    @IsNotEmpty()
    @IsNumber()
    resource_file_size: number;

    @Column('varchar', { length: 5 })
    @IsNotEmpty()
    @IsString()
    reousrce_file_extension: string;

    @Column('varchar', { length: 100 })
    @IsNotEmpty()
    @IsString()
    resource_description: string;

    @Column('varchar')
    @IsNotEmpty()
    @IsString()
    resource_origin_url: string;

    @Column('boolean', { default: false })
    @IsBoolean()
    is_resource_author: boolean;

    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;

    @OneToOne(() => ResourceType)
    @JoinColumn()
    resource_type: ResourceType;
}