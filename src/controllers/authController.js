import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

const JWT_SECRET = 'EHAKALALAJAAL';

const authController = {
    login: async (req, res) => {
        try {
            const { usuario, contraseña } = req.body;

            if (!usuario || !contraseña) {
                return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
            }

            const user = await UserModel.findByUsername(usuario);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas.' });
            }

            if (contraseña !== user.password) {
                return res.status(401).json({ message: 'Credenciales inválidas.' });
            }

            const token = jwt.sign(
                { idUsuario: user.idUsuario, usuario: user.usuario },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login exitoso',
                token,
                user: {
                    id: user.idUsuario,
                    usuario: user.usuario,
                },
            });
        } catch (error) {
            console.error('Error en el controlador de login:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

export default authController;
