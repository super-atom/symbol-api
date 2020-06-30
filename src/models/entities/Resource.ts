import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';

export class Resource extends Model {
    static schemaValidation(data: object): object {
        const schema = Joi.object({
            resource_document_id: Joi.string().guid({ version: 'uuidv4' }),
            resource_type: Joi.number().min(0).max(1),
            reference_count: Joi.number()
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

Resource.init({
    resource_document_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'resource_id'
    },
    resource_type: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            min: 0,
            max: 1
        },
        field: 'resource_type'
    },
    reference_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'reference_count'
    }
}, {
    sequelize: connection,
    modelName: 'resource',
    freezeTableName: true
});