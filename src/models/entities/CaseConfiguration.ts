import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { Human } from './Human';
import { User } from './User';
import { Publication } from './Publication';
import { CaseElement } from './CaseElement';
import { Profile } from './Profile';

export class CaseConfiguration extends Model {
}

CaseConfiguration.init({
}, {
    sequelize: connection,
    modelName: 'case_configuration',
    freezeTableName: true
});

CaseConfiguration.belongsTo(CaseElement, {
    foreignKey: 'case_element_id',
});

CaseConfiguration.belongsTo(Profile, {
    foreignKey: 'profile_id',
});