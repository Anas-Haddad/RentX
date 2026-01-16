import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Zap, Wind, ArrowLeft, Calendar } from 'lucide-react';

import axios from 'axios';
import API_URL from '../config';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fake data for the demo
    const MOCK_CAR = {
        id: 1,
        brand: 'Audi',
        model: 'RS6 Avant',
        price_per_day: 550,
        category: 'Sport',
        transmission: 'Auto',
        fuel: 'Essence',
        hp: 600,
        acceleration: '3.6s',
        topSpeed: '250km/h',
        image: '/images/hero_rs6.png',
        description: "L'Audi RS6 Avant n'est pas qu'un break, c'est une icône de puissance. Avec son moteur V8 bi-turbo, elle offre des performances de supercar tout en conservant un confort et une polyvalence exceptionnels."
    };

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/cars/${id}`);
                const data = res.data;
                setCar({
                    ...data,
                    price: data.price_per_day,
                    image: data.image || (data.images ? JSON.parse(data.images)[0] : '/images/car1.png'),
                    hp: 600, acceleration: '3.6s', topSpeed: '250km/h' // Placeholder for specs not in DB
                });
            } catch (error) {
                console.warn("Using mock car detail:", error);
                setCar(MOCK_CAR);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    const features = ["Assurance Tous Risques", "Kilométrage Illimité", "Assistance 24/7", "Livraison Standard"];

    if (loading) return <div className="min-h-screen pt-40 text-center">Chargement...</div>;
    if (!car) return <div className="min-h-screen pt-40 text-center">Voiture non trouvée.</div>;

    return (
        <div className="bg-transparent min-h-screen pt-32 text-white">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-40">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors font-black uppercase tracking-widest text-[10px] mb-12"
                >
                    <ArrowLeft className="h-4 w-4" /> Retour au catalogue
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="relative glass-card overflow-hidden group mb-10 border-white/5 rounded-[3rem]">
                            <img src={car.image} alt={car.model} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { icon: <Zap />, label: "Puissance", value: `${car.hp} CH` },
                                { icon: <Wind />, label: "0-100", value: car.acceleration },
                                { icon: <Wind />, label: "Vitesse", value: car.topSpeed },
                            ].map((spec, i) => (
                                <div key={i} className="glass p-6 rounded-3xl text-center border-white/5">
                                    <div className="text-brand-primary flex justify-center mb-2">{spec.icon}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{spec.label}</div>
                                    <div className="text-lg font-bold">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">{car.category} Series</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-none">{car.brand} <br /><span className="text-gradient">{car.model}</span></h1>

                        <div className="flex items-baseline gap-2 mb-10">
                            <span className="text-4xl font-black">{car.price} TND</span>
                            <span className="text-zinc-500 font-medium tracking-widest text-xs uppercase">/ Journée</span>
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                            {car.description}
                        </p>

                        <div className="space-y-4 mb-16">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <CheckCircle className="h-5 w-5 text-brand-primary" />
                                    <span className="font-bold text-zinc-300">{f}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('/reservation')}
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-6 rounded-3xl hover:bg-brand-primary hover:text-white transition-all shadow-2xl active:scale-95 flex justify-center items-center gap-4 text-lg"
                        >
                            <Calendar className="h-5 w-5" /> Réserver Maintenant
                        </button>

                        <div className="mt-8 flex items-center justify-center gap-3 text-zinc-500 text-xs font-black uppercase tracking-widest">
                            <Shield className="h-4 w-4" /> Paiement sécurisé à la livraison
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CarDetails;

