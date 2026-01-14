const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Car = sequelize.define('Car', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price_per_day: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    images: {
        type: DataTypes.JSON, // Store array of image URLs
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: { // type: economique, luxe, suv
        type: DataTypes.STRING,
        allowNull: true
    },
    transmission: {
        type: DataTypes.ENUM('Automatic', 'Manual'),
        defaultValue: 'Manual'
    },
    fuel: {
        type: DataTypes.STRING,
        defaultValue: 'Essence'
    },
    ac: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'cars'
});

module.exports = Car;
