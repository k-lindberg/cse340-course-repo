import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const { id } = req.params;

    const categoryDetails = await getCategoryById(id);
    const projects = await getProjectsByCategory(id);

    const title = 'Category Details';

    res.render('category', {
        title,
        categoryDetails,
        projectDetails: { projects }
    });
};

export { showCategoriesPage, showCategoryDetailsPage };
