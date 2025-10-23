import pool from '../../config/db.js';

class ToolModel {
    static async create(description, idCategoria, modelo, num_serie, condicion, status, numero_economico, observaciones) {
        try {
            const [result] = await pool.query(
                'INSERT INTO herramientas (descripcion, idCategoria, modelo, num_serie, condicion, status, numero_economico, observaciones) VALUES (?,?,?,?,?,?,?,?)',
                [description.toUpperCase(), idCategoria, modelo.toUpperCase(), num_serie.toUpperCase(), condicion, status, numero_economico.toUpperCase(), observaciones.toUpperCase()]
            );
        
            return { id: result.insertId, idCategoria, description };
        } catch (error) {
            console.error('Error al crear una nueva categoría:', error);
            throw error;
        }
    }

    static async update(id, description, idCategoria, modelo, num_serie, condicion, status, numero_economico, observaciones) {
        try {
            
            const [result] = await pool.query(
                'UPDATE herramientas SET descripcion = ?, idCategoria = ?, modelo = ?, num_serie = ?, condicion = ?, status = ?, numero_economico = ?, observaciones = ? WHERE idHerramienta = ?',
                [description.toUpperCase(), idCategoria, modelo.toUpperCase(), num_serie.toUpperCase(), condicion, status, numero_economico, observaciones.toUpperCase(), id]
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

    static async disable(id) {
        try {
            
            const [result] = await pool.query(
                'UPDATE herramientas SET activo = 0 WHERE idHerramienta = ?',
                [id]
            );
 
            return { 
                idHerramienta: parseInt(id), 
            };
        } catch (error) {
            console.error(`Error al actualizar herramienta con ID ${id}:`, error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT h.idHerramienta, h.idCategoria, h.descripcion, h.modelo, h.num_serie, h.numero_economico, h.status, h.condicion, h.observaciones,
                u.lugar
                FROM herramientas h
                INNER JOIN ubicaciones u ON h.status = u.id
                WHERE h.activo = 1 ORDER BY h.descripcion ASC
            `);
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las categorías:', error);
            throw error;
        }
    }

    static async getLocations() {
        try {
            const [rows] = await pool.query(`
                SELECT id, lugar FROM ubicaciones WHERE status = 1
            `);
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las ubicaciones:', error);
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
