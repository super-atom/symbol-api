import { Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { CaseElement } from './CaseElement';
import { Profile } from './Profile';

@Entity()
export class CaseConfiguration {
    @PrimaryColumn()
    @OneToOne(() => CaseElement, case_element => case_element.case_element_id)
    @JoinColumn()
    case_element_id: string;

    @PrimaryColumn()
    @OneToMany(() => Profile, profile => profile.profile_id)
    @JoinColumn()
    profile_id: string;
}