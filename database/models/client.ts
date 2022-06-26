import { Model } from 'sequelize';
import { ClientType } from '../../types/client';

module.exports = (sequelize: any, DataTypes: any) => {
  class Client extends Model<ClientType> implements ClientType {
    person_id!: string;
    email!: string;
    password!: string;
    phone!: string;

    static associate(models: any) {
      Client.belongsTo(models.Person, {
        foreignKey: 'person_id'
      });

      Client.hasMany(models.Order, {
        foreignKey: 'client_id'
      });
    }
  }

  Client.init(
    {
      person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Person',
          key: 'id'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email is not valid'
          }
        }
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Client',
      freezeTableName: true,
      createdAt: 'creationDate',
      updatedAt: false
    }
  );

  return Client;
};
