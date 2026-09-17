import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesOnProject } from '../models/categories.js';

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

export { showProjectsPage, showProjectDetailsPage };