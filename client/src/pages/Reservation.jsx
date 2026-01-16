import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, CreditCard, ChevronRight } from 'lucide-react';

const Reservation = () => {
    return (
        <div className="bg-transparent min-h-screen pt-32 text-white">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Réservation Simple</span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6">FINALISER <br /><span className="text-gradient">VOTRE LOCATION</span></h1>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Step 1: Info Personnelle */}
                    <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl -z-10 group-hover:bg-brand-primary/20 transition-colors"></div>
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/10 shrink-0">
                                <User />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Informations Personnelles</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white" placeholder="Nom Complet" />
                            <input className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white" placeholder="Email" />
                        </div>
                    </div>

                    {/* Step 2: Dates */}
                    <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/10 shrink-0">
                                <Calendar />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Détails du Voyage</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Prise en charge</label>
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white invert" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Restitution</label>
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white invert" />
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Paiement */}
                    <div className="glass p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/10 shrink-0">
                                <CreditCard />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Mode de Paiement</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 rounded-3xl bg-white/10 border border-brand-primary/50 flex justify-between items-center cursor-pointer">
                                <div className="flex gap-4 items-center">
                                    <div className="w-4 h-4 rounded-full border-4 border-brand-primary bg-white"></div>
                                    <span className="font-bold">Payer à la livraison</span>
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-zinc-500 italic">Recommandé</span>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex justify-between items-center opacity-50 cursor-not-allowed">
                                <div className="flex gap-4 items-center">
                                    <div className="w-4 h-4 rounded-full border-2 border-zinc-700"></div>
                                    <span className="font-bold text-zinc-500">Carte Bancaire Online</span>
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-zinc-700">Bientôt</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-white text-black font-black uppercase tracking-widest py-6 rounded-[2.5rem] hover:bg-brand-primary hover:text-white transition-all shadow-2xl active:scale-95 flex justify-center items-center gap-4 text-lg">
                        Confirmer la réservation <ChevronRight />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Reservation;

