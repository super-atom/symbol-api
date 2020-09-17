import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';

export class HistoricalData extends Model {
}

HistoricalData.init({
    historical_data: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'publication_id'
    },
    is_temp_data: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_temp_data'
    },
    action_type: {
        type: DataTypes.TINYINT(),
        allowNull: false,
        defaultValue: 1,
        field: 'action_type'
    },
    action_occurred_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'action_type'
    }
}, {
    sequelize: connection,
    modelName: 'publication',
    freezeTableName: true
});