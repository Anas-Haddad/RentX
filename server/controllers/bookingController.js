const { Booking, Car } = require('../models');
const { Op } = require('sequelize');

// Check availability
exports.checkAvailability = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.query;

        if (!carId || !startDate || !endDate) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        // Check if there are overlapping bookings
        const overlaps = await Booking.findAll({
            where: {
                carId,
                status: { [Op.ne]: 'cancelled' },
                [Op.or]: [
                    {
                        start_date: { [Op.lt]: endDate },
                        end_date: { [Op.gt]: startDate }
                    }
                ]
            }
        });

        res.json({ available: overlaps.length === 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error checking availability' });
    }
};

// Get busy dates for a car
exports.getBusyDates = async (req, res) => {
    try {
        const { carId } = req.query;
        if (!carId) return res.status(400).json({ message: 'Car ID required' });

        const bookings = await Booking.findAll({
            where: {
                carId,
                status: { [Op.ne]: 'cancelled' }
            },
            attributes: ['start_date', 'end_date']
        });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching busy dates' });
    }
};

// Create booking
exports.createBooking = async (req, res) => {
    try {
        const { carId, startDate, endDate, customerName, customerEmail, totalPrice } = req.body;

        // Final check before creation
        const overlaps = await Booking.findAll({
            where: {
                carId,
                status: { [Op.ne]: 'cancelled' },
                [Op.or]: [
                    {
                        start_date: { [Op.lt]: endDate },
                        end_date: { [Op.gt]: startDate }
                    }
                ]
            }
        });

        if (overlaps.length > 0) {
            return res.status(400).json({ message: 'Car not available for these dates' });
        }

        const newBooking = await Booking.create({
            carId,
            start_date: startDate,
            end_date: endDate,
            customer_name: customerName,
            customer_email: customerEmail,
            total_price: totalPrice,
            status: 'pending'
        });

        res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating booking' });
    }
};

// Get all bookings (Admin)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [{ model: Car, attributes: ['brand', 'model', 'images'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await Booking.findByPk(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        await booking.update({ status });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking' });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.destroy({ where: { id } });
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
    }
};
