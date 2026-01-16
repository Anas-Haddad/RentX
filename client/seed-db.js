import axios from 'axios';

const initialCars = [
    { brand: 'Audi', model: 'RS6 Avant', price_per_day: 550, category: 'Sport', transmission: 'Automatic', fuel: 'Essence', image: '/images/hero_rs6.png' },
    { brand: 'Mercedes-Benz', model: 'G-Class', price_per_day: 450, category: 'Luxe', transmission: 'Automatic', fuel: 'Essence', image: '/images/car1.png' },
    { brand: 'Range Rover', model: 'Sport', price_per_day: 400, category: 'SUV', transmission: 'Automatic', fuel: 'Diesel', image: '/images/car2.png' },
    { brand: 'BMW', model: 'M5 CS', price_per_day: 500, category: 'Sport', transmission: 'Automatic', fuel: 'Essence', image: '/images/car3.png' },
    { brand: 'Porsche', model: '911 Turbo S', price_per_day: 700, category: 'Luxe', transmission: 'Automatic', fuel: 'Essence', image: '/images/car1.png' },
    { brand: 'Bentley', model: 'Continental GT', price_per_day: 800, category: 'Luxe', transmission: 'Automatic', fuel: 'Essence', image: '/images/car2.png' },
    { brand: 'Ferrari', model: 'Roma', price_per_day: 1200, category: 'Supercar', transmission: 'Automatic', fuel: 'Essence', image: '/images/car3.png' },
    { brand: 'Lamborghini', model: 'Urus', price_per_day: 1000, category: 'SUV', transmission: 'Automatic', fuel: 'Essence', image: '/images/car1.png' },
];

// Determine API URL (local or remote)
const API_URL = 'https://rentx-api-cbp9.onrender.com';

console.log(`Seeding data to: ${API_URL}...`);

async function seed() {
    for (const car of initialCars) {
        try {
            await axios.post(`${API_URL}/api/cars`, {
                brand: car.brand,
                model: car.model,
                price_per_day: car.price_per_day,
                category: car.category,
                description: 'Description par défaut',
                transmission: car.transmission,
                fuel: car.fuel,
                imgUrl: car.image, // Pass as dedicated field or handle in backend logic
                images: JSON.stringify([car.image]),
            });
            console.log(`Added: ${car.brand} ${car.model}`);
        } catch (error) {
            console.error(`Failed to add ${car.brand}:`, error.message);
        }
    }
    console.log('Seeding complete!');
}

seed();
