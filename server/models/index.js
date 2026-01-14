const User = require('./User');
const Admin = require('./Admin');
const Car = require('./Car');
const Booking = require('./Booking');
const Availability = require('./Availability');
const Role = require('./Role');

// Associations

// User <-> Booking
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// Car <-> Booking
Car.hasMany(Booking, { foreignKey: 'carId' });
Booking.belongsTo(Car, { foreignKey: 'carId' });

// Car <-> Availability
Car.hasMany(Availability, { foreignKey: 'carId' });
Availability.belongsTo(Car, { foreignKey: 'carId' });

// Roles (Optional: if implementing strict role table for Admins)
// Admin.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = {
    User,
    Admin,
    Car,
    Booking,
    Availability,
    Role
};
