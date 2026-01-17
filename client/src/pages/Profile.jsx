import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Clock, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/api/bookings/my-bookings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(res.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="bg-transparent min-h-screen pt-32 text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Sidebar / User Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-8 rounded-[3rem] border-white/5 relative overflow-hidden"
                        >
                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-primary/30">
                                    <User size={40} className="text-brand-primary" />
                                </div>
                                <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter">{user.name}</h2>
                                <p className="text-zinc-500 text-sm font-medium mb-8">{user.email}</p>

                                <div className="space-y-4 text-left">
                                    <div className="flex items-center gap-4 text-zinc-400">
                                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center shrink-0 border-white/10">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Email</p>
                                            <p className="text-sm font-bold text-white/80">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-zinc-400">
                                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center shrink-0 border-white/10">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Téléphone</p>
                                            <p className="text-sm font-bold text-white/80">{user.phone || 'Non renseigné'}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { logout(); navigate('/'); }}
                                    className="w-full mt-10 flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all font-black uppercase tracking-widest text-xs"
                                >
                                    <LogOut size={18} /> Déconnexion
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content / Bookings */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Historique</span>
                            <h1 className="text-4xl font-black uppercase tracking-tighter">Mes <span className="text-gradient">Réservations</span></h1>
                        </div>

                        {loading ? (
                            <div className="py-20 text-center glass rounded-[3rem] border-white/5">
                                <div className="animate-spin w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Chargement de vos trajets...</p>
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="py-20 text-center glass rounded-[3rem] border-white/5">
                                <Calendar className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-zinc-600 mb-2 uppercase">Aucun voyage pour le moment</h3>
                                <button
                                    onClick={() => navigate('/cars')}
                                    className="text-brand-primary font-black uppercase tracking-widest text-xs hover:underline"
                                >
                                    Explorer le catalogue
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map((booking, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                            <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden glass relative border-white/10 shrink-0">
                                                <img
                                                    src={booking.Car?.image || (booking.Car?.images ? (typeof booking.Car.images === 'string' ? JSON.parse(booking.Car.images)[0] : booking.Car.images[0]) : '/images/car1.png')}
                                                    alt={booking.Car?.model}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>

                                            <div className="flex-1 space-y-4 text-center md:text-left">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black tracking-tight">{booking.Car?.brand} {booking.Car?.model}</h3>
                                                        <div className="flex items-center justify-center md:justify-start gap-4 mt-1 text-zinc-500">
                                                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                                                <Clock size={14} className="text-brand-primary" />
                                                                {booking.status === 'confirmed' ? 'Confirmé' : booking.status === 'pending' ? 'En attente' : 'Annulé'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-1">Total Payé</p>
                                                        <p className="text-2xl font-black text-brand-primary">{booking.total_price} TND</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Départ</p>
                                                        <p className="font-bold text-sm">{new Date(booking.start_date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Retour</p>
                                                        <p className="font-bold text-sm">{new Date(booking.end_date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
