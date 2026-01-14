import React from 'react';
import { Search, Calendar, MapPin, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import CarCard from '../components/ui/CarCard';

const Home = () => {
    const featuredCars = [
        { id: 1, brand: 'Mercedes-Benz', model: 'G-Class', price: 450, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car1.png' },
        { id: 2, brand: 'Range Rover', model: 'Sport', price: 400, category: 'SUV', transmission: 'Auto', fuel: 'Diesel', image: '/images/car2.png' },
        { id: 3, brand: 'BMW', model: 'X6', price: 380, category: 'Luxe', transmission: 'Auto', fuel: 'Essence', image: '/images/car3.png' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Create a darker overlay */}
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <img
                        src="/images/hero.png"
                        alt="Luxury Car"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                    >
                        Location de voitures <br />
                        <span className="text-blue-500">Premium en Tunisie</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
                    >
                        Expérience de conduite exceptionnelle. Rapide, fiable et sécurisé.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl p-2 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <div className="relative flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                                <MapPin className="text-blue-500 mr-3 h-5 w-5" />
                                <div className="text-left w-full">
                                    <label className="block text-xs uppercase text-gray-400 font-bold tracking-wider">Ville</label>
                                    <input type="text" placeholder="Tunis, Sousse..." className="w-full text-gray-900 placeholder-gray-400 font-semibold outline-none" />
                                </div>
                            </div>
                            <div className="relative flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                                <Calendar className="text-blue-500 mr-3 h-5 w-5" />
                                <div className="text-left w-full">
                                    <label className="block text-xs uppercase text-gray-400 font-bold tracking-wider">Début</label>
                                    <input type="date" className="w-full text-gray-900 font-semibold outline-none" />
                                </div>
                            </div>
                            <div className="relative flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                                <Calendar className="text-blue-500 mr-3 h-5 w-5" />
                                <div className="text-left w-full">
                                    <label className="block text-xs uppercase text-gray-400 font-bold tracking-wider">Fin</label>
                                    <input type="date" className="w-full text-gray-900 font-semibold outline-none" />
                                </div>
                            </div>
                            <div className="px-2">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center">
                                    <Search className="mr-2 h-5 w-5" /> Rechercher
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Cars */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">Voitures Populaires</h2>
                        <p className="text-gray-500">Nos modèles les plus demandés pour un confort absolu.</p>
                    </div>
                    <a href="/cars" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hidden md:block">Voir tout &rarr;</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCars.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <a href="/cars" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Voir tout &rarr;</a>
                </div>
            </section>

            {/* Features / Advantages */}
            <section className="bg-zinc-900 py-24 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pourquoi choisir RentX ?</h2>
                        <p className="text-gray-400">Nous redéfinissons la location de voiture en Tunisie avec un service premium et une fiabilité sans faille.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center p-6 rounded-3xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <CheckCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Service Premium</h3>
                            <p className="text-gray-400">Des voitures impeccables, nettoyées et vérifiées avant chaque location.</p>
                        </div>
                        <div className="text-center p-6 rounded-3xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <Search className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Pas de frais cachés</h3>
                            <p className="text-gray-400">Le prix affiché est le prix que vous payez. Transparence totale.</p>
                        </div>
                        <div className="text-center p-6 rounded-3xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <Calendar className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Réservation Facile</h3>
                            <p className="text-gray-400">Réservez en quelques clics via notre plateforme optimisée.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 mb-16">Ce que disent nos clients</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex text-yellow-400 mb-4">
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                            </div>
                            <p className="text-gray-600 mb-6 italic">"Un service exceptionnel ! La voiture était magnifique et le processus de réservation très simple. Je recommande vivement pour tout séjour à Tunis."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                <div>
                                    <p className="font-bold text-zinc-900">Ahmed B.</p>
                                    <p className="text-xs text-gray-500">Client fidèle</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;
