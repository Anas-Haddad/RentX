const { Booking, Car, Availability } = require('../models');
const { Op } = require('sequelize');

exports.createBooking = async (req, res) => {
    try {
        const { carId, startDate, endDate, userId } = req.body;

        // 1. Check if dates are valid
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) {
            return res.status(400).json({ message: "La date de fin doit être après la date de début." });
        }

        // 2. Check for Overlapping Bookings
        const existingBooking = await Booking.findOne({
            where: {
                carId,
                status: { [Op.not]: 'cancelled' }, // Ignore cancelled bookings
                [Op.or]: [
                    {
                        start_date: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        end_date: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        [Op.and]: [
                            { start_date: { [Op.lte]: startDate } },
                            { end_date: { [Op.gte]: endDate } }
                        ]
                    }
                ]
            }
        });

        if (existingBooking) {
            return res.status(409).json({ message: "Cette voiture n'est pas disponible pour ces dates." });
        }

        // 3. Check hard availability (Availability table blocks)
        const availabilityBlock = await Availability.findOne({
            where: {
                carId,
                [Op.or]: [
                    { start_date: { [Op.between]: [startDate, endDate] } },
                    { end_date: { [Op.between]: [startDate, endDate] } }
                ]
            }
        });

        if (availabilityBlock) {
            return res.status(409).json({ message: "Cette voiture est bloquée (maintenance ou autre) pour ces dates." });
        }

        // 4. Calculate Price
        const car = await Car.findByPk(carId);
        if (!car) return res.status(404).json({ message: "Voiture introuvable." });

        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = days * car.price_per_day;

        // 5. Create Booking
        const newBooking = await Booking.create({
            userId, // Assuming passed from auth middleware (req.user.id normally)
            carId,
            start_date: startDate,
            end_date: endDate,
            total_price: totalPrice,
            status: 'pending'
        });

        // 6. Update Availability (Optional: if we want to explicitly store blocked dates in Availability table too, but Booking table is usually enough if checked correctly. The user requirement says "Blocage automatique des dates après réservation". The check above covers it. We can also add an entry to Availability if we want to unify availability checks.)

        res.status(201).json({ message: "Réservation créée avec succès", booking: newBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la réservation." });
    }
};
