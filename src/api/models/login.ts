import { db } from '../../config/database';
import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './user';

export default class Login extends Model {}
Login.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    is_verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
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
    modelName: 'login',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    sequelize: db
  }
);

Login.belongsTo(User, {
  foreignKey: 'user_id'
});
