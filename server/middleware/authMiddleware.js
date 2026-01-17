const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

            // Add user info from payload to request object
            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Non autorisé, jeton invalide' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Non autorisé, aucun jeton fourni' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Accès refusé, réservé aux administrateurs' });
    }
};

module.exports = { protect, adminOnly };
