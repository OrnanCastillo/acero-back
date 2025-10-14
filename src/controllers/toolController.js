import ToolModel from "../models/toolModel.js";

const toolController = {
    createTool: async (req, res) => {
        try {
            const { description, idCategoria, modelo, num_serie, condicion, status } = req.body;

            if (!description || !idCategoria || !modelo || !num_serie || !condicion || !status) {
                return res.status(400).json({ message: 'Ambos campos son requeridos.' });
            }

            const newTool = await ToolModel.create(description, idCategoria, modelo, num_serie, condicion, status);
            res.status(201).json({
                message: 'Herramienta agregada exitosamente.',
                tool: newTool,
            });
        } catch (error) {
            console.error('Error en el controlador al crear herramienta:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    updateTool: async (req, res) => {
        try {
            const { id } = req.params;
            const { description, idCategoria, modelo, num_serie, condicion, status } = req.body;

            if (!description || !idCategoria || !modelo || !num_serie || !condicion || !status) {
                return res.status(400).json({ message: 'Ambos campos son requeridos.' });
            }

            const updated = await ToolModel.update(id, description, idCategoria, modelo, num_serie, condicion, status);
        
            if (!updated) {
                return res.status(404).json({ message: 'Herramienta no encontrada o no hubo cambios.' });
            }

            res.status(201).json({
                message: 'Herramienta actualizada exitosamente.',
                tool: updated,
            });
        } catch (error) {
            console.error('Error en el controlador al actualizar material:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getAllTools: async (req, res) => {
        try {
            const tools = await ToolModel.getAll();
            res.json(tools);
        } catch (error) {
            console.error('Error en el controlador al obtener herramientas:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;

            const tool = await ToolModel.getById(id);

            if (!tool) {
                return res.status(404).json({ message: 'Herramienta no encontrada.' });
            }

            res.json(tool);
        } catch (error) {
            console.error('Error en el controlador al obtener producto por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { description, idCategoria } = req.body;

            if (!description || !idCategoria) {
                return res.status(400).json({ message: 'Ambos campos son requeridos' });
            }

            const updated = await ToolModel.update(id, description, idCategoria);

            if (!updated) {
                return res.status(404).json({ message: 'Herramienta no encontrada o no hubo cambios.' });
            }

            res.json({ message: 'Herramienta actualizada exitosamente.' });
        } catch (error) {
            console.error('Error en el controlador al actualizar herramienta:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

export default toolController;
