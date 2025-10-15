import MaterialModel from "../models/materialModel.js";

const materialController = {
    createMaterial: async (req, res) => {
        try {
            const { description, idCategoria, stock, detalle, kilogramos, metros } = req.body;

            if (!description || !idCategoria || !stock || !detalle || !kilogramos || !metros) {
                return res.status(400).json({ message: 'Todos los campos son requeridos.' });
            }

            const newMaterial = await MaterialModel.create(description, idCategoria, stock, detalle, kilogramos, metros);
            res.status(201).json({
                message: 'Material agregado exitosamente.',
                material: newMaterial,
            });
        } catch (error) {
            console.error('Error en el controlador al crear material:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getAllMaterial: async (req, res) => {
        try {
            const material = await MaterialModel.getAll();
            res.json(material);
        } catch (error) {
            console.error('Error en el controlador al obtener materiales:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getMaterialById: async (req, res) => {
        try {
            const { id } = req.params;

            const tool = await MaterialModel.getById(id);

            if (!tool) {
                return res.status(404).json({ message: 'Material no encontrado.' });
            }

            res.json(tool);
        } catch (error) {
            console.error('Error en el controlador al obtener material por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    updateMaterial: async (req, res) => {
        try {
            const { id } = req.params;
            const { description, idCategoria, stock, motivo, detalle, kilogramos, metros } = req.body;

            if (!description || !idCategoria || stock === "" || !motivo || !detalle || !kilogramos || !metros) {
                return res.status(400).json({ message: 'Todos los campos son requeridos.' });
            }

            const updated = await MaterialModel.update(id, description, idCategoria, stock, motivo, detalle, kilogramos, metros);

            if (!updated) {
                return res.status(404).json({ message: 'Material no encontrado o no hubo cambios.' });
            }

            res.status(201).json({
                message: 'Material actualizado exitosamente.',
                material: updated,
            });
        } catch (error) {
            console.error('Error en el controlador al actualizar material:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getMovementsType: async (req, res) => {
        try {
            const types = await MaterialModel.getMovementsType();
            res.json(types);
        } catch (error) {
            console.error('Error en el controlador al obtener tipo movimientos:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getMovementsHistorial: async (req, res) => {
        try {
            const historial = await MaterialModel.getMovementsHistorial();
            res.json(historial);
        } catch (error) {
            console.error('Error en el controlador al obtener historial movimientos:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

};

export default materialController;
