import ProjectModel from "../models/projectModel.js";

const projectController = {
    createProject: async (req, res) => {
        try {
            const { descripcion } = req.body;

            if (!descripcion) {
                return res.status(400).json({ message: 'Descripción es obligatoria.' });
            }

            const newProject = await ProjectModel.create(descripcion);

            res.status(201).json({
                message: 'Obra agregada exitosamente.',
                tool: newProject,
            });
        } catch (error) {
            console.error('Error en el controlador al crear obra:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    updateProject: async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion } = req.body;

            if (!descripcion ) {
                return res.status(400).json({ message: 'Descripción es requerida.' });
            }

            const updated = await ProjectModel.update(id, descripcion);
        
            if (!updated) {
                return res.status(404).json({ message: 'Obra no encontrada o no hubo cambios.' });
            }

            res.status(201).json({
                message: 'Obra actualizada exitosamente.',
                tool: updated,
            });
        } catch (error) {
            console.error('Error en el controlador al actualizar obra:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    disableProject: async (req, res) => {
        try {
            const { id } = req.params;
        
            const updated = await ProjectModel.disable(id);
        
            if (!updated) {
                return res.status(404).json({ message: 'Obra no encontrada o no hubo cambios.' });
            }

            res.status(201).json({
                message: 'Obra desactivada exitosamente.',
                tool: updated,
            });
        } catch (error) {
            console.error('Error en el controlador al actualizar obra:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getAllProjects: async (req, res) => {
        try {
            const projects = await ProjectModel.getAll();
            res.json(projects);
        } catch (error) {
            console.error('Error en el controlador al obtener obras:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

export default projectController;
