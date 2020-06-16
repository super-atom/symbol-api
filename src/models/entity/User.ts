import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { connection } from '../../database/dbConnect';
import { Human } from './Human';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserTypeRule from '../../rules/type.rule';

export class User extends Model {
    static createPassword(user_password: string): any {
        return bcrypt.hashSync(user_password, 10);
    }

    static isValidPassword(user_password: string, password: string): any {
        return bcrypt.compareSync(user_password, password);
    }

    getSignedToken(id): any {
        return jwt.sign({ user_id: id }, "SYMBOL", { expiresIn: "1d" });
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
        field: 'user_login_id'
    },
    user_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
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
    }
}, {
    sequelize: connection,
    modelName: 'user',
    freezeTableName: true
})

User.belongsTo(Human, {
    foreignKey: 'human_id',
});