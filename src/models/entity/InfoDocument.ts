import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from "class-validator";
import { Profile } from './Profile';
import { User } from './User';
import { InfoDocumentType } from './InfoDocumentType';

@Entity()
export class InfoDocument {
    @PrimaryGeneratedColumn("uuid")
    @IsNotEmpty()
    @IsString()
    info_doc_id: string;

    @OneToOne(() => User, user => user.user_id)
    @JoinColumn()
    user_id: User;

    @OneToOne(() => Profile, profile => profile.profile_id)
    @JoinColumn()
    profile_id: Profile;

    @OneToOne(() => InfoDocumentType)
    @JoinColumn()
    info_document_type: InfoDocumentType;
}