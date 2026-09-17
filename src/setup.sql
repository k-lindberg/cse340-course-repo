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
('1', 'Solar Shelter Initiative', 'A full solar-panel array will be installed to power the community shelter sustainably.', 'Maple Ridge Community Shelter, Riverton, UT', '2026-11-15'),
('1', 'Green Pathways Project', 'New walking paths will be built using recycled and eco-friendly materials.', 'Brookside Park, Holladay, UT', '2026-12-01'),
('1', 'Community Tool Library Construction', 'A fully stocked community tool-lending facility will be constructed.', 'Westview Resource Center, Provo, UT', '2027-01-20'),
('1', 'EcoPlayground Build Day', 'A sustainable playground will be created using reclaimed and low-impact materials.', 'Sunrise Meadows Elementary, Saratoga Springs, UT', '2027-03-05'),
('1', 'Rainwater Harvesting Retrofit', 'A rain-collection system will be installed to support water conservation at the center.', 'Heritage Hall Community Center, Ogden, UT', '2027-04-10'),

('2', 'Neighborhood MicroGarden Installations', 'Raised micro-gardens will be set up to expand local food-growing capacity.', 'Cedar Hollow Apartments, Salt Lake City, UT', '2026-11-20'),
('2', 'Youth Hydroponics Lab', 'A hands-on hydroponics program will be launched for youth education.', 'Riverbend Youth Center, West Jordan, UT', '2027-02-14'),
('2', 'Seasonal Crop Swap Festival', 'A community festival will be hosted where residents can exchange homegrown crops.', 'Harvest Square Plaza, Layton, UT', '2027-05-01'),
('2', 'Compost for All Program', 'Compost bins will be distributed and residents will learn how to reduce food waste.', 'Lakeside Neighborhood Hub, American Fork, UT', '2027-03-22'),
('2', 'Pollinator Corridor Planting', 'Native flowers will be planted to strengthen the local pollinator corridor.', 'Pioneer Trail Parkway, Farmington, UT', '2027-03-25'),

('3', 'Warm Winter Drive', 'Warm winter supplies will be distributed to community members in need.', 'HopeBridge Outreach Center, Orem, UT', '2026-12-10'),
('3', 'Senior Tech Support Week', 'A week of tech-help sessions will be held for senior residents.', 'Golden Years Community Home, Bountiful, UT', '2027-01-08'),
('3', 'Community Storytime Crew', 'Reading visits will be organized to support literacy and community connection.', 'BrightLeaf Public Library, Eagle Mountain, UT', '2026-11-05'),
('3', 'Neighborhood Cleanup Blitz', 'Volunteers will be coordinated to complete a large-scale neighborhood cleanup.', 'Canyonview District, Lehi, UT', '2027-02-01'),
('3', 'Meal Prep for Hope', 'Nutritious meals will be prepared for individuals experiencing food insecurity.', 'ShelterOne Kitchen, Midvale, UT', '2027-04-18');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO category (name)
VALUES
('Infrastructure'),
('Sustainability'),
('Community');

CREATE TABLE service_project_category (
    service_project_id INT NOT NULL REFERENCES service_project(service_project_id),
    category_id INT NOT NULL REFERENCES category(category_id),
    PRIMARY KEY (service_project_id, category_id)
);

INSERT INTO service_project_category (service_project_id, category_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 3),
(12, 3),
(13, 3),
(14, 3),
(15, 3);