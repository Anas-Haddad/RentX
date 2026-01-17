import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const data = await login(formData.email, formData.password);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/');
            } else {
                await register(formData);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-transparent min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-secondary/10 blur-[100px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass rounded-[3rem] p-10 border-white/5 shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-3 text-white uppercase tracking-tighter">
                        {isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
                    <p className="text-zinc-500 font-medium">
                        {isLogin ? 'Gérez vos locations avec RentX' : 'Rejoignez le club de prestige RentX'}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-5"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Nom Complet</label>
                                    <div className="relative">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                        <input
                                            type="text"
                                            required={!isLogin}
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium text-white"
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium text-white"
                                            placeholder="+216 -- --- ---"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                                required
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 outline-none focus:border-brand-primary transition-colors font-medium text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center font-bold bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95 flex justify-center items-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Traitement...' : isLogin ? 'Se connecter' : "S'inscrire"} <ArrowRight className="h-5 w-5" />
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-zinc-500 text-sm">
                        {isLogin ? "Nouveau sur RentX ?" : "Déjà membre ?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-white font-bold hover:text-brand-primary transition-colors hover:underline"
                        >
                            {isLogin ? 'Créer un compte' : 'Se connecter'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

