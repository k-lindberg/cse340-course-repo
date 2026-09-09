CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_project (
    service_project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
('1', 'Solar Shelter Initiative', 'Installed solar panels', 'Maple Ridge Community Shelter, Riverton, UT', '2024-03-12'),
('1', 'Green Pathways Project', 'Built recycled‑material walking paths', 'Brookside Park, Holladay, UT', '2024-04-05')
('1', 'Community Tool Library Construction', 'Constructed a lending facility', 'Westview Resource Center, Provo, UT', '2025-10-18'),
('1', 'Eco‑Playground Build Day', 'Created a sustainable playground', 'Sunrise Meadows Elementary, Saratoga Springs, UT', '2026-05-27'),
('1', 'Rainwater Harvesting Retrofit', 'Installed rain‑collection systems', 'Heritage Hall Community Center, Ogden, UT', '2024-08-09'),
('2', 'Neighborhood Micro‑Garden Installations', 'Set up raised beds', 'Cedar Hollow Apartments, Salt Lake City, UT', '2026-04-15'),
('2', 'Youth Hydroponics Lab', 'Launched a hydroponics program', 'Riverbend Youth Center, West Jordan, UT', '2025-09-02'),
('2', 'Seasonal Crop Swap Festival', 'Hosted a community crop exchange', 'Harvest Square Plaza, Layton, UT', '2024-10-05'),
('2', 'Compost for All Program', 'Distributed compost bins', 'Lakeside Neighborhood Hub, American Fork, UT', '2025-05-11'),
('2', 'Pollinator Corridor Planting', 'Planted native flowers', 'Pioneer Trail Parkway, Farmington, UT', '2025-05-11'),
('3', 'Warm Winter Drive', 'Distributed winter supplies', 'HopeBridge Outreach Center, Orem, UT', '2025-11-29'),
('3', 'Senior Tech Support Week', 'Held tech‑help sessions', 'Golden Years Community Home, Bountiful, UT', '2026-02-07'),
('3', 'Community Storytime Crew', 'Organized reading visits', 'BrightLeaf Public Library, Eagle Mountain, UT', '2024-03-03'),
('3', 'Neighborhood Cleanup Blitz', 'Coordinated volunteers', 'Canyonview District, Lehi, UT', '2025-04-19'),
('3', 'Meal Prep for Hope', 'Prepared meals', 'ShelterOne Kitchen, Midvale, UT', '2026-08-30');