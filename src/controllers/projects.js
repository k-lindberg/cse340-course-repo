import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const serviceProjects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, serviceProjects });
};

export { showProjectsPage };