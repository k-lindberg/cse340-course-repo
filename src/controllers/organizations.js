import { getAllOrganizations, getAllOrganizationDetails } from '../models/organizations.js';
import { getAllProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {

    console.log("URL param:", req.params.organizationId);
    console.log("Type:", typeof req.params.organizationId);
    
    const organizationId = req.params.organizationId;
    const organizationDetails = await getAllOrganizationDetails(organizationId);
    const projects = await getAllProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });

};    
    
export { showOrganizationsPage, showOrganizationDetailsPage };
        
        

