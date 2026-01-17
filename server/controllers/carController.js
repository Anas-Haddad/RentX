const { Car, Booking } = require('../models');
const { Op } = require('sequelize');

// Get all cars with filtering
exports.getAllCars = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, startDate, endDate } = req.query;
        let where = {};

        if (category && category !== 'All') {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.price_per_day = {};
            if (minPrice) where.price_per_day[Op.gte] = minPrice;
            if (maxPrice) where.price_per_day[Op.lte] = maxPrice;
        }

        let cars;
        if (startDate && endDate) {
            // Find IDs of cars that ARE booked during this period
            const bookedCars = await Booking.findAll({
                where: {
                    status: { [Op.ne]: 'cancelled' },
                    [Op.or]: [
                        {
                            start_date: { [Op.lt]: endDate },
                            end_date: { [Op.gt]: startDate }
                        }
                    ]
                },
                attributes: ['carId']
            });

            const bookedCarIds = bookedCars.map(b => b.carId);

            // Filter cars that are NOT in the bookedCarIds list
            where.id = { [Op.notIn]: bookedCarIds.length > 0 ? bookedCarIds : [0] };
        }

        cars = await Car.findAll({ where });
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get single car
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add new car
exports.createCar = async (req, res) => {
    try {
        const { brand, model, price_per_day, category, description, transmission, fuel, images } = req.body;

        const newCar = await Car.create({
            brand,
            model,
            price_per_day,
            category,
            description,
            transmission,
            fuel,
            images, // Expecting JSON array or string
            is_available: true
        });

        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating car' });
    }
};

// Update car
exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        await car.update(req.body);
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car' });
    }
};

// Delete car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        await car.destroy();
        res.json({ message: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car' });
    }
};
