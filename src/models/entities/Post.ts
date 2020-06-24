import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Profile } from './Profile';
import { User } from './User';
import { Publication } from './Publication';
import { CaseElement } from './CaseElement';

export class Post extends Model {
    static schemaValidation(data: object): object {
        const schema = Joi.object({
            post_type: Joi.number().max(1),
            post_title: Joi.string().max(100).required(),
            post_content: Joi.string().max(500)
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

Post.init({
    post_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'post_id'
    },
    post_type: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        field: 'post_type'
    },
    post_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'post_title'
    },
    post_content: {
        type: DataTypes.STRING(500),
        field: 'post_content'
    }
}, {
    sequelize: connection,
    modelName: 'post',
    freezeTableName: true
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.belongsTo(Profile, {
    foreignKey: 'profile_id',
});

Post.belongsTo(Publication, {
    foreignKey: 'publication_id',
});

Post.belongsTo(CaseElement, {
    foreignKey: 'case_element_id',
});