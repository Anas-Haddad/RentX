import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Car, MessageSquare, Settings, LogOut,
    Plus, Trash2, Edit, Search, CheckCircle, XCircle, Mail,
    TrendingUp, Users, Calendar, UploadCloud
} from 'lucide-react';
import axios from 'axios';
import API_URL from '../config';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [cars, setCars] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showAddCarModal, setShowAddCarModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        fetchCars();
        // fetchMessages(); // Uncomment when message API is ready
    }, []);

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

    // Stats
    const stats = [
        { title: 'Total Voitures', value: cars.length, icon: <Car />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Messages', value: messages.length, icon: <MessageSquare />, color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'Réservations', value: '0', icon: <Calendar />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Revenus', value: '0.0K', icon: <TrendingUp />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
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

    const handleAddCar = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Convert FormData to JSON object for now (Backend expects JSON usually, unless we use multer)
        // Adjust based on your backend. Here assuming JSON for simplicity or file handling needs mulipart/form-data
        // For simple demo with image URL or JSON:
        const carData = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            category: formData.get('category'),
            price_per_day: formData.get('price'),
            image: '/images/car1.png', // Default or handle file upload to Cloudinary/S3
            transmission: 'Automatic',
            fuel: 'Essence'
        };

        try {
            const res = await axios.post(`${API_URL}/api/cars`, carData);
            setCars([...cars, res.data]);
            setShowAddCarModal(false);
        } catch (error) {
            console.error("Error adding car:", error);
            alert("Erreur lors de l'ajout");
        }
    };

    // Messages placeholders (Mock for now until API exists)
    const handleDeleteMessage = (id) => {
        setMessages(messages.filter(m => m.id !== id));
    };

    const toggleMessageStatus = (id) => {
        setMessages(messages.map(m =>
            m.id === id ? { ...m, status: m.status === 'read' ? 'unread' : 'read' } : m
        ));
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
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
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
                                    onClick={() => setShowAddCarModal(true)}
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
                                                            <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
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

                    {activeTab === 'messages' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            key="messages"
                            className="space-y-6"
                        >
                            <h1 className="text-3xl font-black">Messages reçus</h1>
                            <div className="p-10 text-center text-zinc-500 glass rounded-3xl">Module Messages en cours d'intégration API...</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Simple Add Car Modal */}
            {showAddCarModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0a0a] glass border border-white/10 w-full max-w-lg p-8 rounded-[2rem] relative"
                    >
                        <button
                            onClick={() => setShowAddCarModal(false)}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white"
                        >
                            <XCircle />
                        </button>
                        <h2 className="text-2xl font-black mb-6">Ajouter un véhicule</h2>
                        <form className="space-y-4" onSubmit={handleAddCar}>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="brand" placeholder="Marque" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full" />
                                <input name="model" placeholder="Modèle" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select name="category" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full text-zinc-400">
                                    <option value="Sport">Sport</option>
                                    <option value="Luxe">Luxe</option>
                                    <option value="SUV">SUV</option>
                                </select>
                                <input name="price" type="number" placeholder="Prix / Jour" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary w-full" />
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
                                    <span className="text-xs font-bold uppercase tracking-widest">Glisser ou cliquer pour photo</span>
                                </div>
                            </div>
                            <button className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl mt-4 transition-colors">
                                Confirmer l'ajout
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

