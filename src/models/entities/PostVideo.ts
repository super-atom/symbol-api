import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import * as Joi from '@hapi/joi';
import { connection } from '../../database/dbConnect';
import { Post } from './Post';

export class PostVideo extends Model {
    static schemaValidation(data: object): any {
        const schema = Joi.object({
            post_video_id: Joi.string().guid({ version: 'uuidv4' }),
            post_video_type: Joi.number().max(1).required(),
            post_video_access_code: Joi.string().max(11).required(),
        }).options({ abortEarly: false });

        return schema.validate(data);
    }
}

PostVideo.init({
    post_video_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        field: 'post_video_id'
    },
    post_video_type: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        validate: {
            min: 0,
            max: 6
        },
        field: 'post_video_type'
    },
    post_video_access_code: {
        type: DataTypes.STRING(11),
        allowNull: true,
        field: 'post_video_access_code'
    }
}, {
    sequelize: connection,
    modelName: 'post_video',
    freezeTableName: true
});

PostVideo.belongsTo(Post, {
    foreignKey: 'post_id',
});