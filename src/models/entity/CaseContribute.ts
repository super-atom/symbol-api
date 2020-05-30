import { Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CaseElement } from './CaseElement';
import { User } from './User';

@Entity()
export class CaseContribute {
    @PrimaryColumn()
    @OneToOne(() => CaseElement, case_element => case_element.case_element_id)
    @JoinColumn()
    case_element_id: string;

    @PrimaryColumn()
    @OneToMany(() => User, user => user.user_id)
    @JoinColumn()
    user_id: string;
}