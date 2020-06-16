import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { Profile } from './Profile';

export class InfoDocument extends Model {
}

InfoDocument.init({
    info_document_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'info_document_id'
    }
}, {
    sequelize: connection,
    modelName: 'info_document',
    freezeTableName: true
});

InfoDocument.belongsTo(Profile, {
    foreignKey: 'profile_id',
});