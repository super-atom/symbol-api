import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Human } from './Human';
import { Publication } from './Publication';

export class Profile extends Model {
    static schemaValidation(data: object): object {
        const schema = Joi.object({
            activity_name: Joi.string().max(50).required(),
            native_activity_name: Joi.string().max(50),
            profile_description: Joi.string().max(500),
            profile_type: Joi.number().max(1).required(),
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

Profile.init({
    profile_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'profile_id'
    },
    profile_type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: 'profile_type'
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