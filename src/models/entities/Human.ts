import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';

export class Human extends Model {
    static schemaValidation(data: object): object {
        const schema = Joi.object({
            gender: Joi.number(),
            real_name: Joi.string(),
            birthday: Joi.date(),
            birth_country: Joi.string(),
            birth_city: Joi.string(),
            activity_country: Joi.string(),
            current_live_city: Joi.string(),
            is_dead: Joi.boolean()
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

Human.init({
    human_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'human_id'
    },
    gender: {
        type: DataTypes.TINYINT(1),
        field: 'gender'
    },
    birthday: {
        type: DataTypes.DATEONLY,
        field: 'birthday'
    },
    real_name: {
        type: DataTypes.STRING(50),
        field: 'real_name'
    },
    birth_country: {
        type: DataTypes.STRING(50),
        field: 'birth_country'
    },
    birth_city: {
        type: DataTypes.STRING(100),
        field: 'birth_city'
    },
    activity_country: {
        type: DataTypes.STRING(100),
        field: 'activity_country'
    },
    current_live_city: {
        type: DataTypes.STRING(100),
        field: 'current_live_city'
    },
    is_dead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_dead'
    }
}, {
    sequelize: connection,
    modelName: 'human',
    freezeTableName: true
})