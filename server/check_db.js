const sequelize = require('./config/database');
const { Booking } = require('./models');

const checkBookings = async () => {
    try {
        await sequelize.authenticate();
        const bookings = await Booking.findAll();
        console.log('--- ALL BOOKINGS ---');
        bookings.forEach(b => {
            console.log(`ID: ${b.id}, Email: ${b.customer_email}, Status: ${b.status}, UserID: ${b.userId}`);
        });
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkBookings();
