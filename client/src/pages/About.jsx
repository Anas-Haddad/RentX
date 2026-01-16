import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-transparent min-h-screen pt-32 text-white">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Notre Histoire</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-8">L'EXCELLENCE <br /><span className="text-gradient">NOTRE STANDARD</span></h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        RentX est né d'une passion pour l'automobile d'exception. Nous avons créé une plateforme qui allie technologie moderne et service personnalisé.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Shield />, title: "Sécurité Totale", desc: "Chaque véhicule est soumis à un contrôle technique rigoureux avant chaque mise à disposition." },
                        { icon: <Clock />, title: "Flexibilité", desc: "Livraison à l'aéroport ou à votre domicile, selon vos besoins et votre emploi du temps." },
                        { icon: <Award />, title: "Qualité Premium", desc: "Une flotte composée uniquement des derniers modèles des plus grandes marques mondiales." }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-10 text-center">
                            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-8 border-white/5">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{item.title}</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;

