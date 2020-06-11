import { DataTypes } from 'sequelize';
import { connection } from '../../database/dbConnect';

export const Profile = connection.define('profile', {
    profileId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        field: 'profile_id'
    },
    activityName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'activity_name'
    },
    nativeActivityName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'native_activity_name'
    },
    profileDescription: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'profile_description'
    },
    profile_type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: 'profile_type'
    },
    publicationIdPublicationId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'publication_data',
            key: 'publication_id'
        },
        unique: true,
        field: 'publicationIdPublicationId'
    }
}, {
    tableName: 'profile'
});
