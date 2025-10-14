import pool from "../../config/db.js";

class UserModel {
    static async getAllUsers() {
        try {
            const [rows] = await pool.query('SELECT idUsuario, nombre FROM usuarios');
            return rows;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }
    static async findByUsername(usuario) {
        try {
            const [rows] = await pool.query('SELECT idUsuario, usuario, password FROM usuarios WHERE usuario = ?', [usuario]);
            return rows[0];
        } catch (error) {
            console.error(`Error al buscar usuario:`, error);
            throw error;
        }
    }
}

export default UserModel;
