const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: { // To link with Roles table if needed, or simple string
        type: DataTypes.STRING,
        defaultValue: 'admin'
    }
}, {
    tableName: 'admins'
});

module.exports = Admin;
