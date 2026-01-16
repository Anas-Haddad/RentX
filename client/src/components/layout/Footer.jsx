import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-zinc-500 pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-brand-primary/5 blur-[150px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                    <div className="md:col-span-5">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-brand-primary/20">
                                <Car className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-extrabold text-2xl text-white tracking-tight">Rent<span className="text-brand-primary">X</span></span>
                        </div>
                        <p className="text-zinc-400 text-lg max-w-sm mb-10 leading-relaxed">
                            L'excellence de la location automobile en Tunisie. Redéfinissez vos voyages avec une flotte d'exception.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {[
                                { label: "Accueil", to: "/" },
                                { label: "Nos Voitures", to: "/cars" },
                                { label: "Concept", to: "/about" },
                                { label: "Connexion", to: "/login" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link to={link.to} className="hover:text-brand-primary transition-colors text-sm font-medium">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Support</h3>
                        <ul className="space-y-4">
                            {[
                                { label: "Contact", to: "/contact" },
                                { label: "Conditions", to: "#" },
                                { label: "Confidentialité", to: "#" },
                                { label: "FAQ", to: "#" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link to={link.to} className="hover:text-brand-primary transition-colors text-sm font-medium">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Nous contacter</h3>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4">
                                <MapPin className="h-5 w-5 text-brand-primary" />
                                <span className="text-sm font-medium">Les Berges du Lac, Tunis</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-brand-primary" />
                                <span className="text-sm font-medium">+216 71 000 000</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-brand-primary" />
                                <span className="text-sm font-medium">contact@rentx.tn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-medium uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Rent<span className="text-brand-primary font-black">X</span>. Crafted for Excellence.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                        <a href="#" className="hover:text-white transition-colors">CGU</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
