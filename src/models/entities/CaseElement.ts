import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Publication } from './Publication';

export class CaseElement extends Model {
    static schemaValidation(data: object): any {
        const schema = Joi.object({
            case_element_id: Joi.string().guid({ version: 'uuidv4' }),
            case_element_name: Joi.string(),
            case_element_description: Joi.string(),
            case_element_occurred_date: Joi.date()
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

CaseElement.init({
    case_element_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'case_element_id'
    },
    case_element_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'case_element_name'
    },
    case_element_description: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'case_element_description'
    },
    case_element_occurred_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'case_element_occurred_date'
    },
}, {
    sequelize: connection,
    modelName: 'case_element',
    freezeTableName: true
});

CaseElement.belongsTo(Publication, {
    foreignKey: 'publication_id',
});