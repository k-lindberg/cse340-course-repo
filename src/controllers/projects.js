import { getUpcomingProjects, getProjectDetails, createProject } from '../models/projects.js';
import { getCategoriesOnProject } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { validationResult, body } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters long'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 1000 }).withMessage('Description must be less than 1000 characters long'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters long'),
    body('project_date')
        .notEmpty().withMessage('Project date is required')
        .isISO8601().withMessage('Date must be valid date format'),
    body('organization_id')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization ID must be a valid integer')
];

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const serviceProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, serviceProjects });
};

const showProjectDetailsPage = async (req, res) => {
    const { id } = req.params;
    const projectDetails = await getProjectDetails(id);
    const title = 'Project Details';
    const categories = await getCategoriesOnProject(id); // Fetch categories for the project

    res.render('project', { title, projectDetails, categories });
};

const showNewProjectForm = async (req, res) => {
    const title = 'Add New Service Project';
    const organizations = await getAllOrganizations(); // Fetch all organizations for the dropdown

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const { title, description, location, project_date, organization_id } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        
        return res.redirect('/new-project');
    }

    try {
        const newProjectId = await createProject({ title, description, location, project_date, organization_id });
        req.flash('success', 'Project added successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        req.flash('error', 'Failed to create project');
        res.redirect('/new-project');
    }
};

export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation };