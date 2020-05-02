import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    user_id: string;

    @Column()
    user_login_id: string;
}