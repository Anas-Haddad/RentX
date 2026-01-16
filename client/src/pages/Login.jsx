import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-transparent min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-secondary/10 blur-[100px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass rounded-[3rem] p-10 border-white/5 shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-3 text-white">BIENVENUE</h2>
                    <p className="text-zinc-500 font-medium">Connectez-vous pour gérer vos locations</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium text-white"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <a href="#" className="text-xs font-bold text-brand-primary hover:text-white transition-colors">Mot de passe oublié ?</a>
                    </div>

                    <button className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95 flex justify-center items-center gap-3">
                        Se connecter <ArrowRight className="h-5 w-5" />
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-zinc-500 text-sm">
                        Nouveau sur RentX ? <a href="#" className="text-white font-bold hover:text-brand-primary transition-colors">Créer un compte</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

