import db from './db.js'
import { getAllOrganizations } from './organizations.js'

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

export { getAllProjects }