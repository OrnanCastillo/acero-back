import pool from '../../config/db.js';

class ToolModel {
    static async create(description, idCategoria, modelo, num_serie, condicion, status) {
        try {
            const [result] = await pool.query(
                'INSERT INTO herramientas (descripcion, idCategoria, modelo, num_serie, condicion, status) VALUES (?,?,?,?,?,?)',
                [description.toUpperCase(), idCategoria, modelo.toUpperCase(), num_serie.toUpperCase(), condicion, status]
            );
        
            return { id: result.insertId, idCategoria, description };
        } catch (error) {
            console.error('Error al crear una nueva categoría:', error);
            throw error;
        }
    }

    static async update(id, description, idCategoria, modelo, num_serie, condicion, status) {
        try {
            
            const [result] = await pool.query(
                'UPDATE herramientas SET descripcion = ?, idCategoria = ?, modelo = ?, num_serie = ?, condicion = ?, status = ? WHERE idHerramienta = ?',
                [description.toUpperCase(), idCategoria, modelo.toUpperCase(), num_serie.toUpperCase(), condicion, status, id]
            );
 
            return { 
                idHerramienta: parseInt(id), 
                idCategoria, 
                descripcion: description,
            };
        } catch (error) {
            console.error(`Error al actualizar herramienta con ID ${id}:`, error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT idHerramienta, idCategoria, descripcion, modelo, num_serie, condicion, status FROM herramientas ORDER BY descripcion ASC');
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las categorías:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query('SELECT idHerramienta, idCategoria, descripcion FROM herramientas WHERE idHerramienta = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error(`Error al obtener categoría con ID ${id}:`, error);
            throw error;
        }
    }

}

export default ToolModel;
