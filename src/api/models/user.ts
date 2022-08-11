import { db } from '../../config/database';
import { Model, DataTypes, Sequelize } from 'sequelize';

export default class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false
        },
        created_by: {
            type: DataTypes.STRING,
            defaultValue: 'system',
            allowNull: false
        }
    },
    {
        modelName: 'user',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: db
    }
);
