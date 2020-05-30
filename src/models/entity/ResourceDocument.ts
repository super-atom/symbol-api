import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from "class-validator";
import { Resource } from './Resource';
import { User } from './User';

@Entity()
export class ResourceDocument {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    resource_doc_id: string;

    @Column('varchar', { length: 50, default: null })
    @IsString()
    resource_doc_description: string;

    @OneToMany(() => Resource, resource => resource.resource_id)
    @JoinColumn()
    resource_id: Resource;

    @OneToOne(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;
}