import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { User } from './User';

export class Publication extends Model {
}

Publication.init({
    publication_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'publication_id'
    },
    // publication_type: {
    //     type: DataTypes.TINYINT(1),
    //     allowNull: false,
    //     field: 'publication_type'
    // },
    perfection: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        defaultValue: 0,
        field: 'perfection'
    },
    perfection_state: {
        type: DataTypes.INTEGER(1),
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
    is_temp_data: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_temp_data'
    }
}, {
    sequelize: connection,
    modelName: 'publication',
    freezeTableName: true
});

Publication.belongsTo(User, {
    foreignKey: 'user_id',
});