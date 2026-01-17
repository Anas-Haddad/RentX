const sequelize = require('./config/database');
const { User, Admin } = require('./models');

const cleanupUser = async () => {
    const emailToDelete = 'anashaddadazer@gmail.com';
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');

        // 1. Supprimer l'utilisateur simple avec cet email s'il existe
        const userDeleted = await User.destroy({
            where: { email: emailToDelete }
        });

        if (userDeleted) {
            console.log(`Utilisateur simple '${emailToDelete}' supprimé avec succès.`);
        } else {
            console.log(`Aucun utilisateur simple trouvé avec l'email '${emailToDelete}'.`);
        }

        // 2. Vérifier si l'admin existe toujours
        const admin = await Admin.findOne({ where: { email: emailToDelete } });
        if (admin) {
            console.log(`Confirmation : Le compte ADMIN pour '${emailToDelete}' est bien présent.`);
        } else {
            console.log(`Attention : Aucun compte ADMIN trouvé pour '${emailToDelete}'.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Erreur lors du nettoyage :', error);
        process.exit(1);
    }
};

cleanupUser();
