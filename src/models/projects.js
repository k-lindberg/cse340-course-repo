import db from './db.js'
import { getAllOrganizationDetails } from './organizations.js'

const getAllProjects = async () => {
    const query = `
        SELECT
            sp.service_project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            org.name AS organization_name
        FROM public.service_project AS sp
        JOIN public.organization AS org
        ON sp.organization_id = org.organization_id
    `;

    const result = await db.query(query);

    return result.rows;
};

const getAllProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            service_project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            sp.service_project_id,
            sp.title,
            sp.description,
            sp.project_date,
            sp.location,
            org.organization_id,
            org.name AS organization_name
        FROM public.service_project AS sp
        JOIN public.organization AS org
        ON sp.organization_id = org.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            sp.service_project_id,
            sp.title,
            sp.description,
            sp.project_date,
            sp.location,
            org.organization_id,
            org.name AS organization_name
        FROM public.service_project AS sp
        JOIN public.organization AS org
        ON sp.organization_id = org.organization_id
        WHERE sp.service_project_id = $1
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const createProject = async (title, description, location, project_date, organization_id) => {
    const query = `
        INSERT INTO public.service_project (title, description, location, project_date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING service_project_id;
    `;

    const queryParams = [title, description, location, project_date, organization_id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created project with ID:', result.rows[0].service_project_id);
    }

    return result.rows[0].service_project_id;
};

const updateProject = async (title, description, location, project_date, organization_id, projectId) => {
    const query = `
        UPDATE public.service_project
        SET title = $1, description = $2, location = $3, project_date = $4, organization_id = $5
        WHERE service_project_id = $6
        RETURNING service_project_id;
    `;

    const queryParams = [title, description, location, project_date, organization_id, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found or failed to update');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].service_project_id;
};

export { getAllProjects, getAllProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject }