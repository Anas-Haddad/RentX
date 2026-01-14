import React from 'react';

const CarCard = ({ car }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
            <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                    src={car.image || '/images/car1.png'}
                    alt={car.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-zinc-800">
                    {car.category}
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-900">{car.brand} {car.model}</h3>
                        <p className="text-sm text-gray-500">{car.transmission} • {car.fuel}</p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-bold text-blue-600">{car.price} TND</span>
                        <span className="text-xs text-gray-500 ml-1">/ jour</span>
                    </div>

                    <button className="bg-zinc-900 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                        Louer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
