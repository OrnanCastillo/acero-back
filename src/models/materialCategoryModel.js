import pool from '../../config/db.js';

class CategoryModel {
    static async create(description) {
        try {
        const [result] = await pool.query(
            'INSERT INTO categorias_material (descripcion) VALUES (?)',
            [description]
        );
        
            return { id: result.insertId, description };
        } catch (error) {
            console.error('Error al crear una nueva categoría:', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT idCategoria, descripcion FROM categoria_materiales');
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las categorías:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query('SELECT idCategoria, descripcion FROM categorias_material WHERE idCategoria = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error(`Error al obtener categoría con ID ${id}:`, error);
            throw error;
        }
    }

    static async update(id, description) {
        try {
            const [result] = await pool.query(
                'UPDATE categorias_material SET descripcion = ? WHERE idCategoria = ?',
                [description, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error al actualizar categoría con ID ${id}:`, error);
            throw error;
        }
    }
}

export default CategoryModel;
