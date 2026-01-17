import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import CarCard from '../components/ui/CarCard';

import axios from 'axios';
import API_URL from '../config';

import { useLocation } from 'react-router-dom';

const CarList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback data (Mock)
    const MOCK_CARS = [
        { id: 1, brand: 'Audi', model: 'RS6 Avant', price_per_day: 550, category: 'Sport', transmission: 'Auto', fuel: 'Essence', image: '/images/hero_rs6.png' },
        { id: 2, brand: 'Mercedes-Benz', model: 'G-Class', price_per_day: 450, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car1.png' },
        { id: 3, brand: 'Range Rover', model: 'Sport', price_per_day: 400, category: 'SUV', transmission: 'Auto', fuel: 'Diesel', image: '/images/car2.png' },
        { id: 4, brand: 'BMW', model: 'M5 CS', price_per_day: 500, category: 'Sport', transmission: 'Auto', fuel: 'Essence', image: '/images/car3.png' },
        { id: 5, brand: 'Porsche', model: '911 Turbo S', price_per_day: 700, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car1.png' },
        { id: 6, brand: 'Bentley', model: 'Continental GT', price_per_day: 800, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car2.png' },
        { id: 7, brand: 'Ferrari', model: 'Roma', price_per_day: 1200, category: 'Supercar', transmission: 'Auto', fuel: 'Essence', image: '/images/car3.png' },
        { id: 8, brand: 'Lamborghini', model: 'Urus', price_per_day: 1000, category: 'SUV', transmission: 'Auto', fuel: 'Essence', image: '/images/car1.png' },
    ];

    useEffect(() => {
        const loadCars = async () => {
            setLoading(true);
            try {
                // Try fetching from API
                const res = await axios.get(`${API_URL}/api/cars`, {
                    params: {
                        startDate,
                        endDate
                    }
                });
                if (res.data && res.data.length > 0) {
                    // Map API data to match component structure if needed
                    const apiCars = res.data.map(c => ({
                        ...c,
                        price: c.price_per_day, // Map backend field to frontend prop
                        image: c.image || (c.images ? JSON.parse(c.images)[0] : '/images/car1.png')
                    }));
                    setCars(apiCars);
                } else {
                    // If API empty or no results, use Mock if no filter applied
                    if (!startDate && !endDate) {
                        setCars(MOCK_CARS);
                    } else {
                        setCars([]);
                    }
                }
            } catch (error) {
                console.warn("API unavailable:", error);
                // Only show mocks if no filters are active
                if (!startDate && !endDate) {
                    setCars(MOCK_CARS);
                } else {
                    setCars([]);
                }
            } finally {
                setLoading(false);
            }
        };
        loadCars();
    }, [location.search]);

    const categories = ['All', 'Sport', 'Luxe', 'SUV', 'Supercar'];

    const filteredCars = selectedCategory === 'All'
        ? cars
        : cars.filter(car => car.category === selectedCategory);

    return (
        <div className="bg-transparent min-h-screen pt-32 text-white">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
                    <div>
                        <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Notre Catalogue</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-4">LA FLOTTE <br /><span className="text-gradient">RENTX</span></h1>
                        <p className="text-zinc-500 font-medium max-w-lg">Découvrez notre gamme méticuleusement sélectionnée pour vos exigences les plus élevées.</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                                    ? 'bg-white text-black'
                                    : 'glass text-zinc-500 hover:text-white border-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCars.map((car, idx) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <CarCard car={car} />
                        </motion.div>
                    ))}
                </div>

                {filteredCars.length === 0 && (
                    <div className="text-center py-40 glass rounded-[3rem] border-dashed border-white/10">
                        <SearchIcon className="h-16 w-16 text-zinc-800 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-zinc-600 uppercase tracking-tighter">Aucun véhicule disponible</h3>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CarList;

