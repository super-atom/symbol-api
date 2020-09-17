import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { CaseElement } from './CaseElement';
import { Profile } from './Profile';

export class CaseConfiguration extends Model {

}

CaseConfiguration.init({
    case_configuration_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'case_configuration_id'
    },
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