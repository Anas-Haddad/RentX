const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Availability = sequelize.define('Availability', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING, // 'maintenance', 'blocked_by_admin'
        defaultValue: 'maintenance'
    }
}, {
    tableName: 'availability'
});

module.exports = Availability;
