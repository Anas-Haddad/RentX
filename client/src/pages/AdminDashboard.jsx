import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Car, MessageSquare, Settings, LogOut,
    Plus, Trash2, Edit, Search, CheckCircle, XCircle, Mail,
    TrendingUp, Users, Calendar, UploadCloud
} from 'lucide-react';
import axios from 'axios';
import API_URL from '../config';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [cars, setCars] = useState([]);
    const [messages, setMessages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showCarModal, setShowCarModal] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    const [loading, setLoading] = useState(true);

    // Protection
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    // Fetch Data
    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchCars();
            fetchMessages();
            fetchBookings();
        }
    }, [user]);

    const fetchCars = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/cars`);
            setCars(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/messages`);
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/bookings`);
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    // Stats
    const stats = [
        { title: 'Total Voitures', value: cars.length, icon: <Car />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Messages', value: messages.length, icon: <MessageSquare />, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'À Valider', value: bookings.filter(b => b.status === 'pending').length, icon: <Calendar />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Revenus', value: bookings.filter(b => b.status === 'confirmed').reduce((acc, b) => acc + parseFloat(b.total_price), 0).toFixed(0) + ' TND', icon: <TrendingUp />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    ];

    // Handlers
    const handleDeleteCar = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            try {
                await axios.delete(`${API_URL}/api/cars/${id}`);
                setCars(cars.filter(c => c.id !== id));
            } catch (error) {
                console.error("Error deleting car:", error);
                alert("Erreur lors de la suppression");
            }
        }
    };

    const handleEditCar = (car) => {
        setEditingCar(car);
        setShowCarModal(true);
    };

    const handleCarSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const carData = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            category: formData.get('category'),
            price_per_day: formData.get('price'),
            transmission: formData.get('transmission'),
            fuel: formData.get('fuel')
        };

        try {
            if (editingCar) {
                const res = await axios.put(`${API_URL}/api/cars/${editingCar.id}`, carData);
                setCars(cars.map(c => c.id === editingCar.id ? { ...c, ...res.data } : c));
                alert("Véhicule mis à jour avec succès !");
            } else {
                // For new cars, we'll use a default image if none uploaded for now
                carData.images = JSON.stringify(['/images/car1.png']);
                const res = await axios.post(`${API_URL}/api/cars`, carData);
                setCars([...cars, res.data]);
                alert("Véhicule ajouté avec succès !");
            }
            setShowCarModal(false);
            setEditingCar(null);
        } catch (error) {
            console.error("Error submitting car:", error);
            alert("Erreur lors de l'opération");
        }
    };

    // Message Handlers
    const handleDeleteMessage = async (id) => {
        if (confirm('Supprimer ce message ?')) {
            try {
                await axios.delete(`${API_URL}/api/messages/${id}`);
                setMessages(messages.filter(m => m.id !== id));
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        }
    };

    const toggleMessageStatus = async (id) => {
        try {
            const res = await axios.put(`${API_URL}/api/messages/${id}/status`);
            setMessages(messages.map(m =>
                m.id === id ? res.data : m
            ));
        } catch (error) {
            console.error("Error toggling message status:", error);
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            const res = await axios.put(`${API_URL}/api/bookings/${id}/status`, { status });
            setBookings(bookings.map(b => b.id === id ? { ...b, status: res.data.status } : b));
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    const deleteBooking = async (id) => {
        if (confirm('Supprimer cette réservation ?')) {
            try {
                await axios.delete(`${API_URL}/api/bookings/${id}`);
                setBookings(bookings.filter(b => b.id !== id));
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex pt-[80px]">
            {/* Sidebar */}
            <aside className="w-64 fixed left-0 top-[80px] bottom-0 border-r border-white/5 bg-[#050505]/50 backdrop-blur-xl z-20 flex flex-col">
                <div className="p-6">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Menu Principal</span>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard />, label: 'Tableau de bord' },
                        { id: 'bookings', icon: <Calendar />, label: 'Réservations', badge: bookings.filter(b => b.status === 'pending').length },
                        { id: 'cars', icon: <Car />, label: 'Gestion Voitures' },
                        { id: 'messages', icon: <Mail />, label: 'Messages', badge: messages.filter(m => m.status === 'unread').length },
                        { id: 'settings', icon: <Settings />, label: 'Paramètres' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${activeTab === item.id
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {React.cloneElement(item.icon, { size: 20 })}
                                <span className="font-bold text-sm">{item.label}</span>
                            </div>
                            {item.badge > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-bold text-sm">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-[calc(100vh-80px)]">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            key="dashboard"
                            className="space-y-8"
                        >
                            <h1 className="text-3xl font-black">Tableau de bord</h1>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                                {stat.icon}
                                            </div>
                                            <span className="text-xs font-black uppercase text-zinc-500 bg-white/5 px-2 py-1 rounded-full">API</span>
                                        </div>
                                        <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
                                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'cars' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            key="cars"
                            className="space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-black">Gestion de la Flotte</h1>
                                <button
                                    onClick={() => {
                                        setEditingCar(null);
                                        setShowCarModal(true);
                                    }}
                                    className="bg-white text-black hover:bg-brand-primary hover:text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                                >
                                    <Plus size={20} /> Ajouter un véhicule
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center py-20">Chargement des données...</div>
                            ) : (
                                <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 text-zinc-400 text-xs uppercase tracking-wider font-black">
                                            <tr>
                                                <th className="p-6">Véhicule</th>
                                                <th className="p-6">Catégorie</th>
                                                <th className="p-6">Prix / Jour</th>
                                                <th className="p-6">Status</th>
                                                <th className="p-6 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {cars.map((car) => (
                                                <tr key={car.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="p-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-12 rounded-xl bg-white/5 overflow-hidden">
                                                                <img src={car.image || '/images/car1.png'} alt={car.model} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-lg">{car.brand}</div>
                                                                <div className="text-zinc-500 text-xs">{car.model}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-bold bg-white/5">
                                                            {car.category}
                                                        </span>
                                                    </td>
                                                    <td className="p-6 font-bold text-brand-primary">{car.price_per_day} TND</td>
                                                    <td className="p-6">
                                                        <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${(car.is_available || car.status === 'Available') ? 'text-green-500' : 'text-orange-500'
                                                            }`}>
                                                            <div className={`w-2 h-2 rounded-full ${(car.is_available || car.status === 'Available') ? 'bg-green-500' : 'bg-orange-500'
                                                                }`}></div>
                                                            {(car.is_available || car.status === 'Available') ? 'Available' : 'Unavailable'}
                                                        </span>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEditCar(car)}
                                                                className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCar(car.id)}
                                                                className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {cars.length === 0 && (
                                        <div className="p-10 text-center text-zinc-500">Aucun véhicule trouvé dans la base de données.</div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'bookings' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            key="bookings"
                            className="space-y-6"
                        >
                            <h1 className="text-3xl font-black">Gestion des Réservations</h1>
                            <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-zinc-400 text-xs uppercase tracking-wider font-black">
                                        <tr>
                                            <th className="p-6">Client</th>
                                            <th className="p-6">Véhicule</th>
                                            <th className="p-6">Période</th>
                                            <th className="p-6">Prix Total</th>
                                            <th className="p-6">Status</th>
                                            <th className="p-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {bookings.map((b) => (
                                            <tr key={b.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-6">
                                                    <div className="font-bold">{b.customer_name}</div>
                                                    <div className="text-zinc-500 text-xs">{b.customer_email}</div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="font-bold">{b.Car?.brand} {b.Car?.model}</div>
                                                </td>
                                                <td className="p-6 text-zinc-400 text-sm">
                                                    Du {new Date(b.start_date).toLocaleDateString()} <br />
                                                    Au {new Date(b.end_date).toLocaleDateString()}
                                                </td>
                                                <td className="p-6 font-bold text-brand-primary">{b.total_price} TND</td>
                                                <td className="p-6">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${b.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                                                        b.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {b.status === 'confirmed' ? 'Confirmé' : b.status === 'pending' ? 'En attente' : 'Annulé'}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex justify-end gap-2">
                                                        {b.status === 'pending' && (
                                                            <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="p-2 hover:bg-green-500/20 rounded-lg text-green-500 transition-colors" title="Confirmer">
                                                                <CheckCircle size={18} />
                                                            </button>
                                                        )}
                                                        <button onClick={() => deleteBooking(b.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors" title="Supprimer">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {bookings.length === 0 && (
                                    <div className="p-10 text-center text-zinc-500">Aucune réservation pour le moment.</div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'messages' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            key="messages"
                            className="space-y-6"
                        >
                            <h1 className="text-3xl font-black">Messages reçus</h1>
                            <div className="grid gap-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`glass p-6 rounded-3xl border-white/5 transition-all cursor-pointer ${msg.status === 'unread' ? 'border-l-4 border-l-brand-primary bg-brand-primary/5' : 'opacity-80'
                                            }`}
                                        onClick={() => toggleMessageStatus(msg.id)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-4 items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${msg.status === 'unread' ? 'bg-brand-primary text-white' : 'bg-white/10 text-zinc-500'
                                                    }`}>
                                                    {(msg.name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${msg.status === 'unread' ? 'text-white' : 'text-zinc-400'}`}>
                                                        {msg.name}
                                                    </h4>
                                                    <p className="text-zinc-500 text-xs">{msg.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteMessage(msg.id); }}
                                                    className="text-zinc-600 hover:text-red-500 transition-colors"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ml-14">
                                            <h5 className="font-bold text-sm mb-1">{msg.subject}</h5>
                                            <p className="text-zinc-400 text-sm leading-relaxed">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                                {messages.length === 0 && (
                                    <div className="p-10 text-center text-zinc-500 glass rounded-3xl">Aucun message pour le moment.</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Simple Add Car Modal */}
            {showCarModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0a0a] glass border border-white/10 w-full max-w-lg p-8 rounded-[2rem] relative"
                    >
                        <button
                            onClick={() => {
                                setShowCarModal(false);
                                setEditingCar(null);
                            }}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white"
                        >
                            <XCircle />
                        </button>
                        <h2 className="text-2xl font-black mb-6">{editingCar ? 'Modifier le véhicule' : 'Ajouter un véhicule'}</h2>
                        <form className="space-y-4" onSubmit={handleCarSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="brand" placeholder="Marque" defaultValue={editingCar?.brand} required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full" />
                                <input name="model" placeholder="Modèle" defaultValue={editingCar?.model} required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select name="category" defaultValue={editingCar?.category || 'Sport'} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full text-zinc-400">
                                    <option value="Sport">Sport</option>
                                    <option value="Luxe">Luxe</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Supercar">Supercar</option>
                                </select>
                                <input name="price" type="number" placeholder="Prix / Jour" defaultValue={editingCar?.price_per_day} required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select name="transmission" defaultValue={editingCar?.transmission || 'Auto'} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full text-zinc-400">
                                    <option value="Auto">Automatique</option>
                                    <option value="Manual">Manuelle</option>
                                </select>
                                <select name="fuel" defaultValue={editingCar?.fuel || 'Essence'} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full text-zinc-400">
                                    <option value="Essence">Essence</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Électrique</option>
                                    <option value="Hybrid">Hybride</option>
                                </select>
                            </div>

                            {/* Image Upload Area */}
                            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-brand-primary transition-colors cursor-pointer group bg-white/5">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center gap-2 text-zinc-500 group-hover:text-white transition-colors">
                                    <UploadCloud size={32} />
                                    <span className="text-xs font-bold uppercase tracking-widest">
                                        {editingCar ? 'Changer la photo' : 'Glisser ou cliquer pour photo'}
                                    </span>
                                    {editingCar && <p className="text-[10px] text-zinc-600 italic mt-1">Laissez vide pour conserver l'actuelle</p>}
                                </div>
                            </div>
                            <button className="w-full bg-brand-primary hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-xl mt-4 transition-colors">
                                {editingCar ? 'Mettre à jour' : "Confirmer l'ajout"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

