import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Human } from './Human';
import UserTypeRule from '../../rules/type.rule';

export class User extends Model {
    static encryptPassword(user_password: string): Promise<string> {
        return bcrypt.hash(user_password, 10).then(data => {
            return user_password = data;
        });
    }

    static isValidPassword(user_password: string, password: string): Promise<boolean> {
        return bcrypt.compare(user_password, password).then(data => { return data });
    }

    static getSignedToken(id: string): string {
        return jwt.sign({ user_id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    }

    static schemaValidation(data: object): any {
        const schema = Joi.object({
            user_id: Joi.string().guid({ version: 'uuidv4' }),
            user_type: Joi.number().max(1),
            user_login_id: Joi.string().min(3).max(10),
            user_password: Joi.string().min(8).max(20),
            user_email: Joi.string().email().max(20),
            user_contribute_point: Joi.number(),
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
        type: DataTypes.TINYINT(),
        allowNull: false,
        defaultValue: UserTypeRule.User,
        validate: {
            min: 0,
            max: 4
        },
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
        type: DataTypes.BIGINT,
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
});

User.belongsTo(Human, {
    foreignKey: 'human_id',
});