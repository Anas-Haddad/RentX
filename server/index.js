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
    app.use('/api/cars', carRoutes);
    console.log("Routes Cars chargées avec succès !");
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
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync models (force: false means it won't drop tables every time)
        // In development, might use true or alter: true if schemas change
        await sequelize.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
