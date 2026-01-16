import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Car, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="fixed w-full z-50 top-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 pointer-events-auto border-white/5 shadow-2xl">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform shadow-lg shadow-brand-primary/20">
                            <Car className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-white">Rent<span className="text-brand-primary">X</span></span>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-zinc-400 hover:text-white px-2 py-1 text-sm font-medium transition-colors">Accueil</Link>
                        <Link to="/cars" className="text-zinc-400 hover:text-white px-2 py-1 text-sm font-medium transition-colors">Nos Voitures</Link>
                        <Link to="/about" className="text-zinc-400 hover:text-white px-2 py-1 text-sm font-medium transition-colors">Concept</Link>
                        <Link to="/contact" className="text-zinc-400 hover:text-white px-2 py-1 text-sm font-medium transition-colors">Contact</Link>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-zinc-100 hover:bg-white text-black px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
                        >
                            Connexion
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-300 hover:text-white p-2">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-4 right-4 glass rounded-3xl p-6 pointer-events-auto shadow-2xl border-white/10"
                    >
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="text-white text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Accueil</Link>
                            <Link to="/cars" className="text-white text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Nos Voitures</Link>
                            <Link to="/about" className="text-white text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Concept</Link>
                            <Link to="/contact" className="text-white text-lg font-medium p-2" onClick={() => setIsOpen(false)}>Contact</Link>
                            <button
                                onClick={() => { navigate('/login'); setIsOpen(false); }}
                                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-primary/20"
                            >
                                Connexion
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
