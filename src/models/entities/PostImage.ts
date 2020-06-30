import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Post } from './Post';

export class PostImage extends Model {
    static schemaValidation(data: object): object {
        const schema = Joi.object({
            post_image_id: Joi.string().guid({ version: 'uuidv4' }),
            post_image_type: Joi.number().min(0).max(5),
            is_exist_thumbnails: Joi.boolean()
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

PostImage.init({
    post_image_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'post_image_id'
    },
    post_image_type: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        },
        field: 'post_image_type'
    },
    is_exist_thumbnails: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_exist_thumbnails'
    }
}, {
    sequelize: connection,
    modelName: 'post_image',
    freezeTableName: true
});

PostImage.belongsTo(Post, {
    foreignKey: 'post_id',
});