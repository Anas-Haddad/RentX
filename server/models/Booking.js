const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
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
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Format de l'email invalide"
            }
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'bookings',
    timestamps: true
});

module.exports = Booking;
