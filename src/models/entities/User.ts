import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Human } from './Human';
import UserTypeRule from '../../rules/type.rule';

export class User extends Model {
    static isValidPassword(user_password: string, password: string): boolean {
        return bcrypt.compareSync(user_password, password);
    }

    static getSignedToken(id: string): string {
        return jwt.sign({ user_id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    }

    static schemaValidation(data: object): object {
        const schema = Joi.object({
            user_type: Joi.number().max(1).required(),
            user_login_id: Joi.string().required().min(3).max(10),
            user_password: Joi.string().required().min(8).max(20),
            user_email: Joi.string().required().email().max(20),
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

User.init({
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'user_id'
    },
    user_type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: UserTypeRule.User,
        field: 'user_type'
    },
    user_login_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 10]
        },
        field: 'user_login_id'
    },
    user_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        field: 'user_email'
    },
    user_password: {
        type: "BINARY(60)",
        allowNull: false,
        field: 'user_password'
    },
    user_contribute_point: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
        field: 'user_contribute_point'
    },
    is_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_delete'
    },
}, {
    sequelize: connection,
    modelName: 'user',
    freezeTableName: true
})

User.belongsTo(Human, {
    foreignKey: 'human_id',
});