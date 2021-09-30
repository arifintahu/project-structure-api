import { db } from '../../config/database';
import { Model, DataTypes } from 'sequelize';

export default class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    id_role: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'users',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    sequelize: db
  }
);
