import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { Human } from './Human';
import { Publication } from './Publication';
import UserTypeRule from '../../rules/type.rule';

export class Profile extends Model {
}

Profile.init({
    profile_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'profile_id'
    },
    activity_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'activity_name'
    },
    native_activity_name: {
        type: DataTypes.STRING(50),
        field: 'native_activity_name'
    },
    profile_description: {
        type: DataTypes.STRING(500),
        field: 'profile_description'
    },
    profile_type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: 'profile_type'
    },
}, {
    sequelize: connection,
    modelName: 'profile',
    freezeTableName: true
});

Profile.belongsTo(Human, {
    foreignKey: 'human_id',
});

Profile.belongsTo(Publication, {
    foreignKey: 'publication_id',
});