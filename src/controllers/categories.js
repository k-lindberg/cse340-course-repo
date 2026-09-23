import { getAllCategories, getCategoryById, getProjectsByCategory, getCategoriesOnProject, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesOnProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategorieIds = req.body.categoryIds || [];
    
    // Ensure selectedCategorieIds is an array
    const categoryIdsArray = Array.isArray(selectedCategorieIds) ? selectedCategorieIds : [selectedCategorieIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };
