const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
console.log("Tentative de chargement des routes...");
try {
    const carRoutes = require('./routes/carRoutes');
    const messageRoutes = require('./routes/messageRoutes');
    const bookingRoutes = require('./routes/bookingRoutes');
    const authRoutes = require('./routes/authRoutes');

    app.use('/api/cars', carRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/bookings', bookingRoutes);
    app.use('/api/auth', authRoutes);
    console.log("Routes Cars, Messages & Bookings chargées avec succès !");
} catch (error) {
    console.error("ERREUR FATALE CHARGEMENT ROUTES CARS:", error);
}
app.get('/', (req, res) => {
    res.send('RentX API V2 is running - Routes Loaded? Check Logs');
});

// Sync Database and Start Server
const startServer = async () => {
    try {
        console.log('Tentative de connexion à la BDD...');
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // On production, avoid sync({alter: true}) on every startup to prevent timeouts
        // Only run it if explicitly needed or in dev
        if (process.env.NODE_ENV !== 'production') {
            console.log('Syncing models...');
            await sequelize.sync({ alter: true });
            console.log('Models synced.');
        } else {
            console.log('Syncing models with alter in production...');
            await sequelize.sync({ alter: true });
            console.log('Production Models synced.');
        }

        // --- SELF-REPAIR & CLEANUP LOGIC ---
        try {
            const { User, Admin } = require('./models');
            const bcrypt = require('bcrypt');
            const adminEmail = 'anashaddadazer@gmail.com';
            const adminPass = 'Realmadrid01*';

            // 1. Supprimer l'utilisateur simple qui crée le conflit
            const duplicateUser = await User.findOne({ where: { email: adminEmail } });
            if (duplicateUser) {
                console.log('⚠️ CONFLIT DÉTECTÉ : Suppression du compte utilisateur simple pour', adminEmail);
                await duplicateUser.destroy();
            }

            // 2. S'assurer que le compte ADMIN est présent et à jour
            const existingAdmin = await Admin.findOne({ where: { email: adminEmail } });
            const hashedPassword = await bcrypt.hash(adminPass, 10);

            if (!existingAdmin) {
                await Admin.create({
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'admin'
                });
                console.log('✅ Compte ADMIN créé avec succès.');
            } else {
                // Forcer la mise à jour du mot de passe pour être sûr
                await existingAdmin.update({ password: hashedPassword, role: 'admin' });
                console.log('✅ Compte ADMIN mis à jour (Mot de passe réinitialisé).');
            }
        } catch (cleanupError) {
            console.error('Erreur lors du nettoyage auto:', cleanupError);
        }
        // ------------------------------------

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('CRITICAL DATABASE ERROR:', error);
        // Do not exit process, let Render restart it or see the log
    }
};

startServer();
