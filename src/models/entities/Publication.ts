import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { User } from './User';

export class Publication extends Model {
    static schemaValidation(data: object): object {
        const schema = Joi.object({
            publication_id: Joi.string().guid({ version: 'uuidv4' }),
            publication_type: Joi.number().min(1).max(4),
            perfection: Joi.number().max(100),
            perfection_state: Joi.number(),
            view_count: Joi.number(),
            is_hide: Joi.number().max(1),
            is_delete: Joi.number().max(1),
            is_published: Joi.number().max(1),
            is_temp_data: Joi.number().max(1),
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

Publication.init({
    publication_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'publication_id'
    },
    publication_type: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            min: 1,
            max: 4
        },
        field: 'publication_type'
    },
    perfection: {
        type: DataTypes.TINYINT(3),
        allowNull: false,
        defaultValue: 0,
        field: 'perfection'
    },
    perfection_state: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        field: 'perfection_state'
    },
    view_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
        field: 'view_count'
    },
    is_hide: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_hide'
    },
    is_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_delete'
    },
    is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_published'
    },
}, {
    sequelize: connection,
    modelName: 'publication',
    freezeTableName: true
});

Publication.belongsTo(User, {
    foreignKey: 'user_id',
});