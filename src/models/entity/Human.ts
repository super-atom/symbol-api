import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { Profile } from './Profile';

export class Human extends Model { }

Human.init({
    human_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'human_id'
    },
    gender: {
        type: DataTypes.INTEGER(1),
        field: 'gender'
    },
    age: {
        type: DataTypes.INTEGER(3),
        field: 'age'
    },
    birthday: {
        type: DataTypes.DATE(),
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