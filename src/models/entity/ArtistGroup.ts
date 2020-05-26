import { Entity, OneToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class ArtistGroup {
    @PrimaryColumn()
    @OneToOne(() => Profile, profile => profile.profile_id)
    @JoinColumn()
    profile_id: string;

    @PrimaryColumn()
    @OneToMany(() => Profile, profile => profile.activity_name)
    @JoinColumn()
    activity_name: string;
}