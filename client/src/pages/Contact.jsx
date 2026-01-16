import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-transparent min-h-screen pt-32 text-white">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Nous Contacter</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">ENTRONS EN <br /><span className="text-gradient">CONTACT</span></h1>
                        <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
                            Besoin d'un renseignement spécifique ou d'une demande sur mesure ? Nos experts sont à votre disposition 24/7.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: <MapPin />, title: "Siège Social", desc: "Les Berges du Lac 2, Tunis, Tunisie" },
                                { icon: <Phone />, title: "Téléphone", desc: "+216 71 000 000" },
                                { icon: <Mail />, title: "Email", desc: "contact@rentx.tn" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/5 transition-colors group-hover:bg-brand-primary group-hover:text-white shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-500 font-black uppercase tracking-widest text-[10px] mb-1">{item.title}</h4>
                                        <p className="text-xl font-bold text-white">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-10 rounded-[2.5rem] border-white/5 shadow-2xl"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Nom</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium" placeholder="Votre nom" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Prénom</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium" placeholder="Votre prénom" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium" placeholder="Email professionnel" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Message</label>
                                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium h-40 resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                            </div>
                            <button className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95 flex justify-center items-center gap-3">
                                <Send className="h-5 w-5" /> Envoyer
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

