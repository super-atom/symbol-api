import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { Profile } from './Profile';
import { User } from './User';

export class ResourceDocument extends Model {
}

ResourceDocument.init({
    resource_document_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'resource_document_id'
    }
}, {
    sequelize: connection,
    modelName: 'resource_document',
    freezeTableName: true
});

ResourceDocument.belongsTo(User, {
    foreignKey: 'user_id',
});

ResourceDocument.belongsTo(Profile, {
    foreignKey: 'profile_id',
});