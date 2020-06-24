import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';

export class Resource extends Model {
}

Resource.init({
    resource_document_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'resource_id'
    },
}, {
    sequelize: connection,
    modelName: 'resource',
    freezeTableName: true
});