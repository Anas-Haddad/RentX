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
    app.use('/api/cars', carRoutes);
    app.use('/api/messages', messageRoutes);
    console.log("Routes Cars & Messages chargées avec succès !");
} catch (error) {
    console.error("ERREUR FATALE CHARGEMENT ROUTES CARS:", error);
}
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));

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
            // In prod, maybe just create if not exists, or skip if you use migrations
            // For now, let's just do a safe sync (no alter) to be sure tables exist
            await sequelize.sync();
        }

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('CRITICAL DATABASE ERROR:', error);
        // Do not exit process, let Render restart it or see the log
    }
};

startServer();
