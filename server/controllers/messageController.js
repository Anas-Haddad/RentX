const { Message } = require('../models');

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = await Message.create({ name, email, subject, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error: error.message });
    }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.destroy({ where: { id } });
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
};

// Toggle status (read/unread)
exports.toggleMessageStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByPk(id);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        const newStatus = message.status === 'read' ? 'unread' : 'read';
        await message.update({ status: newStatus });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message', error: error.message });
    }
};
