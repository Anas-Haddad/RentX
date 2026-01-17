const { User, Admin } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'user') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone
        });

        if (user) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: 'user',
                token: generateToken(user.id)
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription', details: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if it's an admin first (PRIORITY)
        const admin = await Admin.findOne({ where: { email } });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                return res.json({
                    id: admin.id,
                    email: admin.email,
                    role: 'admin',
                    token: generateToken(admin.id, 'admin')
                });
            }
        }

        // 2. Check if it's a regular user
        const user = await User.findOne({ where: { email } });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: 'user',
                    token: generateToken(user.id)
                });
            }
        }

        res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const admin = await Admin.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            });
            return res.json({ ...admin.toJSON(), role: 'admin' });
        }

        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        res.json({ ...user.toJSON(), role: 'user' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
};
