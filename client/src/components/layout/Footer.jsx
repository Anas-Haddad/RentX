import React from 'react';
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-gray-300 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <Car className="h-8 w-8 text-blue-500 mr-2" />
                            <span className="font-bold text-2xl text-white">RentX</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Location de voitures de luxe en Tunisie. Expérience premium, service rapide et fiable.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Liens Rapides</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Accueil</a></li>
                            <li><a href="/cars" className="hover:text-blue-400 transition-colors">Nos Voitures</a></li>
                            <li><a href="/about" className="hover:text-blue-400 transition-colors">À Propos</a></li>
                            <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-blue-500" /> Tunis, Tunisie</li>
                            <li className="flex items-center"><Phone className="h-4 w-4 mr-2 text-blue-500" /> +216 XX XXX XXX</li>
                            <li className="flex items-center"><Mail className="h-4 w-4 mr-2 text-blue-500" /> contact@rentx.tn</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Suivez-nous</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-blue-600 transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-pink-600 transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-blue-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} RentX. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
