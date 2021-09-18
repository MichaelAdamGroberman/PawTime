const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notes extends Model {}

Notes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pet_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'pet',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'notes',
    }
);

module.exports = Notes;