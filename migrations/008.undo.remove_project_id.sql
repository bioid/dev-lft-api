ALTER TABLE IF EXISTS requests
ADD COLUMN project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE NOT NULL;