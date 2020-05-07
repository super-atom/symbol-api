import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { RelationLoader } from "typeorm/query-builder/RelationLoader";
import { RelationIdLoader } from "typeorm/query-builder/RelationIdLoader";
import { IsNotEmpty, Min, Max } from "class-validator";
import { Profile } from './Profile';

@Entity()
export class Human {
    @Column()
    gender: string

    @Column()
    birthday: Date

    @Column()
    real_name: string

    @Column()
    birth_country: string

    @Column()
    birth_city: string

    @Column()
    activity_country: string

    @Column()
    current_live_city: string

    @Column()
    @IsNotEmpty()
    popularity: number

    @Column()
    @IsNotEmpty()
    influence: number

    @Column()
    @IsNotEmpty()
    reputation: number

    @Column()
    @IsNotEmpty()
    isDead: boolean

    @Column()

    @PrimaryColumn()
    @OneToMany(() => Profile, profile => profile.human)
    profiles: Profile[];
}