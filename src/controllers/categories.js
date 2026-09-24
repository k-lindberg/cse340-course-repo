import { getAllCategories, getCategoryById, getProjectsByCategory, getCategoriesOnProject, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters long')
];

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

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';
    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const title = 'Add New Category';
        res.render('new-category', { title, errors: errors.array() });
        return;
    }

    try {
        await createCategory(name);
        req.flash('success', 'Category created successfully.');
        res.redirect('/categories');
    } catch (error) {
        req.flash('error', 'Failed to create category');
        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }   

    try {
        await updateCategory(categoryId, name);
        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories');
    } catch (error) {
        req.flash('error', 'Failed to update category');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation };
