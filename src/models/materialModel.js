import pool from '../../config/db.js';

class MaterialModel {
    static async create(description, idCategoria, stock, detalle, kilogramos, metros) {
        try {
            const [result] = await pool.query(
                'INSERT INTO materiales (descripcion, idCategoria, kilogramos, metros) VALUES (?,?,?,?)',
                [description.toUpperCase() + " (" + kilogramos + " KG/M" +  ")", idCategoria, kilogramos, metros]
            );

            await pool.query(
                'INSERT INTO stock_material (idMaterial, stock) VALUES (?,?)',
                [result.insertId, stock]
            );

            const [reason] = await pool.query(
                'INSERT INTO movimientos SET tipo = 2, detalle = ?, idMaterial = ?, fecha = NOW()', [detalle.toUpperCase(), result.insertId]
            )
        
            return { 
                idMaterial: result.insertId, 
                idCategoria, 
                descripcion: description,
                stock

            };
        } catch (error) {
            console.error('Error al crear una nueva categoría:', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const [rows] = await pool.query(`
                SELECT m.idMaterial, m.descripcion, m.idCategoria, (m.kilogramos * sm.stock) AS kilogramos, m.kilogramos AS m_kilogramos, (m.metros * sm.stock) AS metros, m.metros AS m_metros, c.descripcion AS categoria, sm.stock 
                FROM materiales m 
                INNER JOIN categoria_materiales c ON m.idCategoria = c.idCategoria 
                INNER JOIN stock_material sm ON m.idMaterial = sm.idMaterial ORDER BY m.descripcion ASC`
            );
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las categorías:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query('SELECT idMaterial, idCategoria, descripcion FROM materiales WHERE idMaterial = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error(`Error al obtener categoría con ID ${id}:`, error);
            throw error;
        }
    }

    static async update(id, description, idCategoria, stock, motivo, detalle, kilogramos, metros) {
        
        try {
            const [result] = await pool.query(
                'UPDATE materiales SET descripcion = ?, idCategoria = ?, kilogramos = ?, metros = ? WHERE idMaterial = ?',
                [description.toUpperCase(), idCategoria, kilogramos, metros, id]
            );

            const [stockR] = await pool.query(
                'UPDATE stock_material SET stock = ? WHERE idMaterial = ?',
                [stock, id]
            );

            const [reason] = await pool.query(
                'INSERT INTO movimientos SET tipo = ?, detalle = ?, idMaterial = ?, fecha = NOW()', [motivo, detalle, id]
            )

            return { 
                idMaterial: parseInt(id), 
                idCategoria, 
                descripcion: description,
                stock

            };
        } catch (error) {
            console.error(`Error al actualizar material con ID ${id}:`, error);
            throw error;
        }
    }

    static async getMovementsType() {
        try {
            const [rows] = await pool.query('SELECT idTipo, descripcion FROM tipo_movimientos');
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las tipo de movimientos:', error);
            throw error;
        }
    }

    static async getMovementsHistorial() {
        try {
            const [rows] = await pool.query(
                `SELECT mov.idMovimiento, mov.detalle, m.descripcion AS material, tm.descripcion AS movimiento, DATE_FORMAT(mov.fecha, '%Y-%m-%d %H:%i:%s') AS fecha FROM movimientos mov
                INNER JOIN materiales m ON mov.idMaterial = m.idMaterial
                INNER JOIN tipo_movimientos tm ON mov.tipo = tm.idTipo
                ORDER BY mov.fecha DESC`
            );
            return rows;
        } catch (error) {
            console.error('Error al obtener todas los movimientos', error);
            throw error;
        }
    }
}

export default MaterialModel;
