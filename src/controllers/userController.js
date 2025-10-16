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
    },
    getPermisoModificacion: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await UserModel.getPermiso(parseInt(id));

            if(!user) return res.status(401).json({ message: 'Usuario no autorizado.' });
            res.json(user);
        } catch (error) {
            console.error('Error en el controlador al obtener usuarios con permisos:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

export default userController;
