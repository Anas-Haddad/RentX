import React from 'react';
import { Search, Calendar, MapPin, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CarCard from '../components/ui/CarCard';

const Home = () => {
    const featuredCars = [
        { id: 1, brand: 'Audi', model: 'RS6 Avant', price: 550, category: 'Sport', transmission: 'Auto', fuel: 'Essence', image: '/images/hero_rs6.png' },
        { id: 2, brand: 'Mercedes-Benz', model: 'G-Class', price: 450, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car1.png' },
        { id: 3, brand: 'Range Rover', model: 'Sport', price: 400, category: 'SUV', transmission: 'Auto', fuel: 'Diesel', image: '/images/car2.png' },
        { id: 4, brand: 'BMW', model: 'M5 CS', price: 500, category: 'Sport', transmission: 'Auto', fuel: 'Essence', image: '/images/car3.png' },
        { id: 5, brand: 'Porsche', model: '911 Turbo S', price: 700, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car1.png' },
        { id: 6, brand: 'Bentley', model: 'Continental GT', price: 800, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car2.png' },
    ];

    return (
        <div className="bg-transparent min-h-screen text-white overflow-x-hidden">
            {/* Cinematic Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video or Image with deep masking */}
                <div className="absolute inset-0 z-0 scale-105">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505] z-10"></div>
                    <img
                        src="/images/hero_rs6.png"
                        alt="Audi RS6 Hero"
                        className="w-full h-full object-cover opacity-60 animate-float-slow"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-6xl mx-auto pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6">
                            L'excellence de la mobilité
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
                            DOMINEZ LA <br />
                            <span className="text-gradient">ROUTE</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-medium">
                            Accédez à une collection exclusive de véhicules de prestige pour vos déplacements en Tunisie.
                        </p>
                    </motion.div>

                    {/* Futuristic Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="glass p-2 rounded-[2.5rem] border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] max-w-5xl mx-auto translate-y-12"
                    >
                        <div className="bg-transparent rounded-[2.2rem] p-2 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                            <div className="group flex items-center px-8 py-4 bg-white/5 rounded-3xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                                <MapPin className="text-brand-primary h-5 w-5 mr-4" />
                                <div className="text-left">
                                    <label className="block text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-1">Destination</label>
                                    <input type="text" placeholder="Ville..." className="bg-transparent w-full text-white placeholder-zinc-700 font-bold outline-none text-sm" />
                                </div>
                            </div>
                            <div className="group flex items-center px-8 py-4 bg-white/5 rounded-3xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                                <Calendar className="text-brand-primary h-5 w-5 mr-4" />
                                <div className="text-left">
                                    <label className="block text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-1">Départ</label>
                                    <input type="date" className="bg-transparent w-full text-white font-bold outline-none text-sm cursor-pointer invert" />
                                </div>
                            </div>
                            <div className="group flex items-center px-8 py-4 bg-white/5 rounded-3xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                                <Calendar className="text-brand-primary h-5 w-5 mr-4" />
                                <div className="text-left">
                                    <label className="block text-[9px] uppercase text-zinc-500 font-black tracking-widest mb-1">Retour</label>
                                    <input type="date" className="bg-transparent w-full text-white font-bold outline-none text-sm cursor-pointer invert" />
                                </div>
                            </div>
                            <div className="px-1">
                                <button className="w-full bg-white text-black hover:bg-brand-primary hover:text-white font-black py-5 rounded-[2rem] transition-all flex justify-center items-center text-xs uppercase tracking-widest shadow-xl active:scale-95">
                                    <Search className="mr-3 h-5 w-5" /> Réserver
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Selection */}
            <section className="py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Notre Flotte</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Sélectionné pour <br /><span className="text-gradient">votre confort</span></h2>
                    </div>
                    <Link to="/cars" className="glass px-8 py-3 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all border-white/10 group flex items-center">
                        Explorer tout
                        <div className="ml-3 group-hover:translate-x-2 transition-transform">&rarr;</div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredCars.map((car, idx) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <CarCard car={car} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-40 bg-zinc-950 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Pourquoi nous ?</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">L'art du voyage <br />sans compromis.</h2>
                            <p className="text-zinc-400 text-lg mb-12 max-w-lg leading-relaxed">
                                RentX n'est pas qu'une simple location de voiture. C'est la promesse d'une expérience fluide, élégante et sécurisée partout en Tunisie.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { icon: <CheckCircle />, title: "Disponibilité 24/7", desc: "Support client dédié à chaque instant de votre trajet." },
                                    { icon: <Star />, title: "Haut de Gamme", desc: "Entretien rigoureux et options de luxe incluses." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/5 shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-white text-lg">{item.title}</h4>
                                            <p className="text-zinc-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-primary/20 blur-[80px] rounded-full opacity-50"></div>
                            <img src="/images/car2.png" alt="Luxury SUV" className="relative z-10 w-full animate-float" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

