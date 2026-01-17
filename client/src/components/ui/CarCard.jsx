import { useNavigate, useLocation } from 'react-router-dom';

const CarCard = ({ car }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    // Create a query string with dates if they exist
    const dateParams = start && end ? `?start=${start}&end=${end}` : '';

    // Handle different data structures (API vs Mock)
    const displayPrice = car.price || car.price_per_day;
    const displayImage = car.image || (car.images ? (typeof car.images === 'string' ? JSON.parse(car.images)[0] : car.images[0]) : '/images/car1.png');

    return (
        <div className="glass-card group overflow-hidden cursor-pointer" onClick={() => navigate(`/cars/${car.id}${dateParams}`, { state: { car } })}>
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <img
                    src={displayImage}
                    alt={car.brand}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 glass px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
                    {car.category}
                </div>
            </div>

            <div className="p-6 relative z-20">
                <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-white tracking-tight leading-none mb-1 group-hover:text-brand-primary transition-colors">{car.brand} {car.model}</h3>
                    <div className="flex gap-3 mt-3">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{car.transmission}</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{car.fuel}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-5 border-t border-white/10">
                    <div>
                        <span className="text-2xl font-black text-white">{displayPrice} <span className="text-xs font-medium text-zinc-400">TND/J</span></span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/reservation/${car.id}${dateParams}`, { state: { car } });
                        }}
                        className="bg-white text-black hover:bg-brand-primary hover:text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-black/10 active:scale-95"
                    >
                        Réserver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
