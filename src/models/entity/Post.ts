import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from "class-validator";
import { User } from './User';
import { PostType } from './PostType';

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    post_id: string;

    @Column('varchar', { length: 50 })
    @IsNotEmpty()
    @IsString()
    post_title: string;

    @Column('varchar', { length: 500 })
    @IsNotEmpty()
    @IsString()
    post_content: string;

    @OneToOne(() => PostType, post_type => post_type.post_type)
    @JoinColumn()
    post_type: PostType;

    @OneToOne(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;
}