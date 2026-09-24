import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id,
               name
        FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (id) => {
    const query = `
        SELECT category_id,
               name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const getCategoriesOnProject = async (projectId) => {
    const query = `
        SELECT c.category_id,
             c.name
        FROM public.category AS c
        JOIN public.service_project_category AS pc ON c.category_id = pc.category_id
        WHERE pc.service_project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

const getProjectsByCategory = async (categoryId) => {
    const query = `
        SELECT sp.service_project_id,
               sp.title
        FROM public.service_project AS sp
        JOIN public.service_project_category AS pc ON sp.service_project_id = pc.service_project_id
        WHERE pc.category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.service_project_category (service_project_id, category_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, delete existing category assignments for the project
    const deleteQuery = `
        DELETE FROM public.service_project_category
        WHERE service_project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO public.category (name)
        VALUES ($1);
    `;
    await db.query(query, [name]);
};

const updateCategory = async (id, name) => {
    const query = `
        UPDATE public.category
        SET name = $2
        WHERE category_id = $1;
    `;
    await db.query(query, [id, name]);
};

export { getAllCategories, getCategoryById, getCategoriesOnProject, getProjectsByCategory, assignCategoryToProject, updateCategoryAssignments, createCategory, updateCategory };