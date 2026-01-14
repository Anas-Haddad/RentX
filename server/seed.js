const sequelize = require('./config/database');
const { Admin, Car } = require('./models');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Don't wipe everything if running multiple times

        // Create Default Admin
        const adminEmail = 'anashaddadazer@gmail.com';
        const adminPass = 'Realmadrid01*';

        const existingAdmin = await Admin.findOne({ where: { email: adminEmail } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPass, 10);
            await Admin.create({
                email: adminEmail,
                password: hashedPassword,
                role: 'superAdmin'
            });
            console.log('Default Admin created.');
        } else {
            console.log('Default Admin already exists.');
        }

        // Seed some cars if empty
        const carCount = await Car.count();
        if (carCount === 0) {
            await Car.bulkCreate([
                {
                    brand: 'Mercedes-Benz',
                    model: 'G-Class',
                    price_per_day: 450,
                    images: ['/images/car1.png'],
                    category: 'Luxe',
                    transmission: 'Automatic',
                    fuel: 'Essence',
                    description: 'Luxury SUV for premium experience.'
                },
                {
                    brand: 'Range Rover',
                    model: 'Sport',
                    price_per_day: 400,
                    images: ['/images/car2.png'],
                    category: 'SUV',
                    transmission: 'Automatic',
                    fuel: 'Diesel',
                    description: 'Sporty and comfortable SUV.'
                },
                {
                    brand: 'BMW',
                    model: 'X6',
                    price_per_day: 380,
                    images: ['/images/car3.png'],
                    category: 'Luxe',
                    transmission: 'Automatic',
                    fuel: 'Essence',
                    description: 'Dynamic coupe-like SUV.'
                }
            ]);
            console.log('Sample cars created.');
        }

        console.log('Seeding completed.');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
