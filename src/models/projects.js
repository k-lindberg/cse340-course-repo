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

export { getAllProjects, getAllProjectsByOrganizationId }