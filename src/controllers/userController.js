import UserModel from '../models/userModel.js';

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error en el controlador al obtener usuarios:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
};

export default userController;
