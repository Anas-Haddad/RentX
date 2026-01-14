import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Car, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="bg-zinc-900 text-white shadow-lg fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <Car className="h-8 w-8 text-blue-500 mr-2" />
                        <span className="font-bold text-2xl tracking-tighter">RentX</span>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Accueil</Link>
                        <Link to="/cars" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Nos Voitures</Link>
                        <Link to="/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">À Propos</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105"
                        >
                            Connexion
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-zinc-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Accueil</Link>
                        <Link to="/cars" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Nos Voitures</Link>
                        <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>À Propos</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Connexion</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
