import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, CreditCard, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reservation = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const passedCar = location.state?.car;

    const searchParams = new URLSearchParams(location.search);
    const urlStart = searchParams.get('start');
    const urlEnd = searchParams.get('end');

    const [car, setCar] = useState(passedCar || null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        startDate: urlStart || '',
        endDate: urlEnd || ''
    });

    const [busyDates, setBusyDates] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error', 'loading'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (id && !car) {
            const fetchCar = async () => {
                try {
                    const res = await axios.get(`${API_URL}/api/cars/${id}`);
                    setCar(res.data);
                } catch (err) {
                    console.error("Car not found");
                }
            };
            fetchCar();
        }
    }, [id, car]);

    // Helper to parse "YYYY-MM-DD" as local Date
    const parseLocalDate = (dateStr) => {
        if (!dateStr) return null;
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    // Helper to format Date as "YYYY-MM-DD" local
    const formatLocalDate = (date) => {
        if (!date) return '';
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Fetch Busy Dates
    useEffect(() => {
        if (car) {
            const fetchBusyDates = async () => {
                try {
                    const res = await axios.get(`${API_URL}/api/bookings/busy-dates`, {
                        params: { carId: car.id }
                    });
                    // Convert "YYYY-MM-DD" back to local Date objects for react-datepicker
                    const intervals = res.data.map(b => ({
                        start: parseLocalDate(b.start_date),
                        end: parseLocalDate(b.end_date)
                    }));
                    setBusyDates(intervals);
                } catch (e) {
                    console.error("Error fetching busy dates");
                }
            };
            fetchBusyDates();
        }
    }, [car]);

    const calculateTotal = () => {
        if (!formData.startDate || !formData.endDate || !car) return 0;
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff * (car.price || car.price_per_day) : 0;
    };

    const isIntervalAvailable = (start, end) => {
        if (!start || !end) return false;
        const s = parseLocalDate(start);
        const e = parseLocalDate(end);

        return !busyDates.some(busy => {
            // Overlap check using local date objects
            return (s < busy.end && e > busy.start);
        });
    };

    const handleConfirm = async () => {
        if (!validateEmail(formData.email)) {
            setStatus('error');
            setErrorMessage("Veuillez saisir un email valide.");
            return;
        }

        if (!isIntervalAvailable(formData.startDate, formData.endDate)) {
            setStatus('error');
            setErrorMessage("Certaines dates de votre sélection sont déjà réservées. Veuillez choisir une autre période.");
            return;
        }

        setStatus('loading');
        try {
            await axios.post(`${API_URL}/api/bookings`, {
                carId: car.id,
                startDate: formData.startDate,
                endDate: formData.endDate,
                customerName: formData.name,
                customerEmail: formData.email,
                totalPrice: calculateTotal()
            });
            setStatus('success');
        } catch (e) {
            console.error(e);
            setStatus('error');
            // Store the specific error message if available
            if (e.response?.data?.details) {
                setErrorMessage(e.response.data.details);
            } else {
                setErrorMessage("Erreur lors de la réservation. Veuillez réessayer.");
            }
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-12 rounded-[3rem] text-center max-w-lg">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black mb-4 uppercase">Réservation Confirmée !</h2>
                    <p className="text-zinc-400 mb-8">Votre demande est en attente de validation par l'administrateur. Vous recevrez un email de confirmation sous peu.</p>
                    <button onClick={() => navigate('/cars')} className="bg-brand-primary px-8 py-4 rounded-2xl font-bold">Retour au catalogue</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-transparent min-h-screen pt-32 text-white">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Processus de Réservation</span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6">VOTRE <br /><span className="text-gradient">SÉJOUR DE LUXE</span></h1>
                </motion.div>

                {!car ? (
                    <div className="text-center py-20 glass rounded-[3rem]">Sélectonnez d'abord une voiture</div>
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            {/* Step 1: Info */}
                            <div className="glass p-10 rounded-[3rem] border-white/5 relative">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/10 shrink-0"><User /></div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">Coordonnées</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 uppercase text-[10px] font-black tracking-widest text-zinc-500">
                                    <div className="space-y-2">
                                        <label className="ml-4">Nom Complet</label>
                                        <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white" placeholder="Nom & Prénom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ml-4">Email</label>
                                        <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white" placeholder="votre@email.com" />
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Dates */}
                            <div className="glass p-10 rounded-[3rem] border-white/5">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary border-white/10 shrink-0"><Calendar /></div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">Dates souhaitées</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 uppercase text-[10px] font-black tracking-widest text-zinc-500">
                                    <div className="space-y-4">
                                        <label className="ml-4">Départ</label>
                                        <DatePicker
                                            selected={formData.startDate ? parseLocalDate(formData.startDate) : null}
                                            onChange={(date) => setFormData({ ...formData, startDate: formatLocalDate(date) })}
                                            selectsStart
                                            startDate={formData.startDate ? parseLocalDate(formData.startDate) : null}
                                            endDate={formData.endDate ? parseLocalDate(formData.endDate) : null}
                                            minDate={new Date()}
                                            excludeDateIntervals={busyDates}
                                            placeholderText="Sélectionner"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="ml-4">Retour</label>
                                        <DatePicker
                                            selected={formData.endDate ? parseLocalDate(formData.endDate) : null}
                                            onChange={(date) => setFormData({ ...formData, endDate: formatLocalDate(date) })}
                                            selectsEnd
                                            startDate={formData.startDate ? parseLocalDate(formData.startDate) : null}
                                            endDate={formData.endDate ? parseLocalDate(formData.endDate) : null}
                                            minDate={formData.startDate ? parseLocalDate(formData.startDate) : new Date()}
                                            excludeDateIntervals={busyDates}
                                            placeholderText="Sélectionner"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-colors text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary & Final Button */}
                        <button
                            disabled={!formData.startDate || !formData.endDate || !formData.name || !formData.email || !validateEmail(formData.email)}
                            onClick={() => {
                                setStatus(null);
                                setErrorMessage('');
                                setShowSummary(true);
                            }}
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-6 rounded-[2.5rem] hover:bg-brand-primary hover:text-white transition-all shadow-2xl active:scale-95 flex justify-center items-center gap-4 text-lg disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Récapitulatif & Paiement <ChevronRight />
                        </button>
                    </div>
                )}
            </section>

            {/* Confirmation Box (Modal) */}
            <AnimatePresence>
                {showSummary && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0a0a0a] glass border border-white/10 w-full max-w-xl p-10 rounded-[3rem] shadow-2xl">
                            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Vérification de Réservation</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between border-b border-white/5 pb-4">
                                    <span className="text-zinc-500 uppercase font-bold text-[10px]">Véhicule</span>
                                    <span className="font-bold text-lg">{car.brand} {car.model}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-4">
                                    <span className="text-zinc-500 uppercase font-bold text-[10px]">Client</span>
                                    <span className="font-bold">{formData.name}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-4">
                                    <span className="text-zinc-500 uppercase font-bold text-[10px]">Période</span>
                                    <div className="text-right">
                                        <div className="font-bold">{formData.startDate} au {formData.endDate}</div>
                                        <div className="text-xs text-brand-primary font-bold">{calculateTotal() / (car.price || car.price_per_day)} nuits</div>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4 bg-brand-primary/10 p-6 rounded-2xl border border-brand-primary/20">
                                    <span className="text-white uppercase font-black text-xs tracking-widest">Total à régler</span>
                                    <span className="text-3xl font-black text-brand-primary">{calculateTotal()} TND</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setShowSummary(false)} className="flex-1 border border-white/10 py-5 rounded-2xl font-bold hover:bg-white/5 uppercase text-xs tracking-widest transition-colors">Modifier</button>
                                <button onClick={handleConfirm} disabled={status === 'loading'} className="flex-2 bg-white text-black py-5 px-10 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-primary hover:text-white transition-all">
                                    {status === 'loading' ? 'Validation...' : 'Confirmer & Réserver'}
                                </button>
                            </div>
                            {status === 'error' && (
                                <p className="text-red-500 text-center text-[10px] mt-4 font-bold border border-red-500/20 bg-red-500/5 p-3 rounded-xl animate-pulse">
                                    {errorMessage || "Erreur système. Veuillez réessayer."}
                                </p>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Reservation;
