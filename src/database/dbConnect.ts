import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from '../models/entity/User';
import { UserType } from '../models/entity/UserType';
import { InitModelData } from '../models/data/index';
import { Profile } from '../models/entity/Profile';
import { ProfileType } from '../models/entity/ProfileType';
import { PublicationData } from '../models/entity/PublicationData';
import { HistoricalData } from '../models/entity/HistoricalData';
import { Human } from '../models/entity/Human';
import { Post } from '../models/entity/Post';
import { PostType } from '../models/entity/PostType';
import { InfoDocument } from '../models/entity/InfoDocument';
import { ResourceDocument } from '../models/entity/ResourceDocument';
import { ResourceType } from '../models/entity/ResourceType';
import { InfoDocumentType } from '../models/entity/InfoDocumentType';
import { Resource } from '../models/entity/Resource';
import { CountryCode } from '../models/entity/CountryCode';
import { ArtistGroup } from '../models/entity/ArtistGroup';
import { ArtistCommon } from '../models/entity/ArtistCommon';
import { ArtistActivityType } from '../models/entity/ArtistActivityType';
import { AuthenticationEmail } from '../models/entity/AuthenticationEmail';
import { AuthenticationSession } from '../models/entity/AuthenticationSession';
import { CaseElement } from '../models/entity/CaseElement';
import { CaseContribute } from '../models/entity/CaseContribute';
import { CaseConfiguration } from '../models/entity/CaseConfiguration';

declare let process: {
    env: {
        DB_HOST: string,
        DB_PORT: number,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_NAME: string
    }
}

export const connection = createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User,
        UserType,
        Human,
        Profile,
        ProfileType,
        PublicationData,
        HistoricalData,
        InfoDocument,
        InfoDocumentType,
        ResourceDocument,
        ResourceType,
        Resource,
        CaseElement,
        CaseContribute,
        CaseConfiguration,
        Post,
        PostType,
        ArtistCommon,
        ArtistGroup,
        ArtistActivityType,
        AuthenticationEmail,
        AuthenticationSession,
        CountryCode,
    ],
}).then(() => {
    console.log('DB connected!');
    new InitModelData();
}).catch(error => console.log(error));