import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetails from './pages/CarDetails';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        {/* AnimatePresence for smooth route transitions if desired, requires wrapping routes */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes to be implemented properly */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
