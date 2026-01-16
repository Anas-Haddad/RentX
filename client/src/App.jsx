import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetails from './pages/CarDetails';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar />}

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<CarList />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Admin Routes to be implemented properly */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
}

export default App;
