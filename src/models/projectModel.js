import pool from '../../config/db.js';

class ProjectModel {
    static async create(descripcion) {
        try {
            const [result] = await pool.query(
                'INSERT INTO ubicaciones (lugar) VALUES (?)',
                [descripcion.toUpperCase()]
            );
        
            return { id: result.insertId };
        } catch (error) {
            console.error('Error al crear una nueva obra:', error);
            throw error;
        }
    }

    static async update(id, descripcion) {
        try {
            
            const [result] = await pool.query(
                'UPDATE ubicaciones SET lugar = ? WHERE id = ?',
                [descripcion.toUpperCase(), id]
            );
 
            return { 
                id: parseInt(id), 
            };
        } catch (error) {
            console.error(`Error al actualizar obra con ID ${id}:`, error);
            throw error;
        }
    }

    static async disable(id) {
        try {
            
            const [result] = await pool.query(
                'UPDATE ubicaciones SET status = 0 WHERE id = ?',
                [id]
            );
 
            return { 
                id: parseInt(id), 
            };
        } catch (error) {
            console.error(`Error al actualizar obra con ID ${id}:`, error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM ubicaciones WHERE status = 1 AND id > 3
            `);
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las obras:', error);
            throw error;
        }
    }

}

export default ProjectModel;
