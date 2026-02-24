const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define(
    'User',
    {
        UserId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'UserId'
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PassWord: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('GETDATE()')
        },
        LastLogin: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'Users',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['PassWord'] }
        }
    }
);

User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.PassWord;
    return values;
};

module.exports = User;