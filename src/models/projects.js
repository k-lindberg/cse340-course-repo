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
}

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

export { getAllProjects, getAllProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }