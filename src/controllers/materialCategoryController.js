import CategoryModel from "../models/materialCategoryModel.js";

const categoryController = {
    createCategory: async (req, res) => {
        try {
            const { description } = req.body;

            if (!description) {
                return res.status(400).json({ message: 'La descripción es requerida.' });
            }

            const newCategory = await CategoryModel.create(description);
            res.status(201).json({
                message: 'Categoría creada exitosamente.',
                category: newCategory,
            });
        } catch (error) {
            console.error('Error en el controlador al crear categoría:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getAllCategories: async (req, res) => {
        try {
            const categories = await CategoryModel.getAll();
            res.json(categories);
        } catch (error) {
            console.error('Error en el controlador al obtener categorías:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;

            const category = await CategoryModel.getById(id);

            if (!category) {
                return res.status(404).json({ message: 'Categoría no encontrada.' });
            }

            res.json(category);
        } catch (error) {
            console.error('Error en el controlador al obtener categoría por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { description } = req.body;

            if (!description) {
                return res.status(400).json({ message: 'La descripción es requerida para la actualización.' });
            }

            const updated = await CategoryModel.update(id, description);

            if (!updated) {
                return res.status(404).json({ message: 'Categoría no encontrada o no hubo cambios.' });
            }

            res.json({ message: 'Categoría actualizada exitosamente.' });
        } catch (error) {
            console.error('Error en el controlador al actualizar categoría:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

export default categoryController;
