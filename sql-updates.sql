-- SQL Schema Updates for Portfolio Application
-- Execute these commands in Supabase SQL Editor

-- 1. Update skills table to support new categorization system
-- First, let's check if the skills table exists and update it
ALTER TABLE skills 
ADD COLUMN IF NOT EXISTS icon_url TEXT,
ADD COLUMN IF NOT EXISTS skill_category TEXT DEFAULT 'Other',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing skills with proper categories if they don't have them
UPDATE skills 
SET skill_category = CASE 
    WHEN LOWER(name) IN ('javascript', 'typescript', 'react', 'vue.js', 'angular', 'html5', 'css3', 'tailwind css', 'bootstrap', 'next.js') THEN 'Web Development'
    WHEN LOWER(name) IN ('flutter', 'dart', 'react native', 'android', 'ios', 'kotlin', 'swift', 'java') THEN 'Mobile Development'
    WHEN LOWER(name) IN ('python', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'jupyter', 'r') THEN 'AI/ML & Data Science'
    WHEN LOWER(name) IN ('node.js', 'python', 'java', 'c#', 'php', 'go', 'rust', 'django', 'flask', 'spring boot') THEN 'Backend Development'
    WHEN LOWER(name) IN ('mysql', 'postgresql', 'mongodb', 'redis', 'aws', 'google cloud', 'azure', 'docker', 'kubernetes') THEN 'Database & Cloud'
    WHEN LOWER(name) IN ('git', 'github', 'gitlab', 'jenkins', 'docker', 'kubernetes', 'linux', 'vs code') THEN 'DevOps & Tools'
    ELSE 'Other'
END
WHERE skill_category IS NULL OR skill_category = 'Other';

-- Update icon URLs for existing skills
UPDATE skills 
SET icon_url = CASE 
    WHEN LOWER(name) = 'javascript' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    WHEN LOWER(name) = 'typescript' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    WHEN LOWER(name) = 'react' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    WHEN LOWER(name) = 'vue.js' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
    WHEN LOWER(name) = 'angular' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg'
    WHEN LOWER(name) = 'node.js' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    WHEN LOWER(name) = 'python' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    WHEN LOWER(name) = 'flutter' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'
    WHEN LOWER(name) = 'dart' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg'
    WHEN LOWER(name) = 'java' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
    WHEN LOWER(name) = 'html5' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    WHEN LOWER(name) = 'css3' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    WHEN LOWER(name) = 'tailwind css' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
    WHEN LOWER(name) = 'bootstrap' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
    WHEN LOWER(name) = 'mysql' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    WHEN LOWER(name) = 'postgresql' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    WHEN LOWER(name) = 'mongodb' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    WHEN LOWER(name) = 'docker' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
    WHEN LOWER(name) = 'git' THEN 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    ELSE image
END
WHERE icon_url IS NULL;

-- 2. Create project_images table for multiple images per project
CREATE TABLE IF NOT EXISTS project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER DEFAULT 0,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_order ON project_images(project_id, image_order);

-- 3. Create project_skills junction table to link projects with skills
CREATE TABLE IF NOT EXISTS project_skills (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, skill_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_project_skills_project_id ON project_skills(project_id);
CREATE INDEX IF NOT EXISTS idx_project_skills_skill_id ON project_skills(skill_id);

-- 4. Update projects table to support additional fields
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS long_description TEXT,
ADD COLUMN IF NOT EXISTS project_status TEXT DEFAULT 'completed',
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'personal',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 5. Create skill_categories table for better category management
CREATE TABLE IF NOT EXISTS skill_categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default skill categories
INSERT INTO skill_categories (name, icon, description, display_order) VALUES
('Web Development', '🌐', 'Frontend and backend web technologies', 1),
('Mobile Development', '📱', 'Mobile app development technologies', 2),
('AI/ML & Data Science', '🤖', 'Artificial Intelligence and Machine Learning', 3),
('Backend Development', '⚙️', 'Server-side development technologies', 4),
('Database & Cloud', '☁️', 'Database and cloud computing technologies', 5),
('DevOps & Tools', '🛠️', 'Development tools and DevOps technologies', 6)
ON CONFLICT (name) DO NOTHING;

-- 6. Create user_skills table for user skill management
CREATE TABLE IF NOT EXISTS user_skills (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER DEFAULT 1 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    years_experience DECIMAL(3,1) DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, skill_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_featured ON user_skills(user_id, is_featured);

-- 7. Create triggers for updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at columns
DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_images_updated_at ON project_images;
CREATE TRIGGER update_project_images_updated_at BEFORE UPDATE ON project_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_skill_categories_updated_at ON skill_categories;
CREATE TRIGGER update_skill_categories_updated_at BEFORE UPDATE ON skill_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_skills_updated_at ON user_skills;
CREATE TRIGGER update_user_skills_updated_at BEFORE UPDATE ON user_skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Create RLS (Row Level Security) policies
-- Enable RLS on new tables
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;

-- Create policies for project_images
CREATE POLICY "Public project images are viewable by everyone" ON project_images FOR SELECT USING (true);
CREATE POLICY "Users can insert project images" ON project_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update project images" ON project_images FOR UPDATE USING (true);
CREATE POLICY "Users can delete project images" ON project_images FOR DELETE USING (true);

-- Create policies for project_skills
CREATE POLICY "Public project skills are viewable by everyone" ON project_skills FOR SELECT USING (true);
CREATE POLICY "Users can insert project skills" ON project_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update project skills" ON project_skills FOR UPDATE USING (true);
CREATE POLICY "Users can delete project skills" ON project_skills FOR DELETE USING (true);

-- Create policies for skill_categories
CREATE POLICY "Skill categories are viewable by everyone" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can modify skill categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for user_skills
CREATE POLICY "Users can view their own skills" ON user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own skills" ON user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own skills" ON user_skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own skills" ON user_skills FOR DELETE USING (auth.uid() = user_id);

-- 9. Create views for easier data access
CREATE OR REPLACE VIEW project_details AS
SELECT 
    p.*,
    COALESCE(
        json_agg(
            json_build_object(
                'id', pi.id,
                'image_url', pi.image_url,
                'image_order', pi.image_order,
                'alt_text', pi.alt_text,
                'is_primary', pi.is_primary
            ) ORDER BY pi.image_order
        ) FILTER (WHERE pi.id IS NOT NULL), 
        '[]'::json
    ) as images,
    COALESCE(
        json_agg(
            json_build_object(
                'id', s.id,
                'name', s.name,
                'category', s.category,
                'icon_url', s.icon_url
            )
        ) FILTER (WHERE s.id IS NOT NULL), 
        '[]'::json
    ) as skills
FROM projects p
LEFT JOIN project_images pi ON p.id = pi.project_id
LEFT JOIN project_skills ps ON p.id = ps.project_id
LEFT JOIN skills s ON ps.skill_id = s.id
GROUP BY p.id;

-- 10. Sample data migration (optional - uncomment if needed)
/*
-- Migrate existing project images to project_images table
INSERT INTO project_images (project_id, image_url, image_order, is_primary)
SELECT id, image, 0, true
FROM projects 
WHERE image IS NOT NULL AND image != ''
ON CONFLICT DO NOTHING;

-- Create sample project-skill relationships based on technologies array
-- This would need to be customized based on your existing data structure
*/

-- 11. Create functions for common operations
CREATE OR REPLACE FUNCTION get_skills_by_category()
RETURNS TABLE (
    category_name TEXT,
    category_icon TEXT,
    skills JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sc.name as category_name,
        sc.icon as category_icon,
        COALESCE(
            json_agg(
                json_build_object(
                    'id', s.id,
                    'name', s.name,
                    'icon_url', s.icon_url,
                    'description', s.description
                )
            ) FILTER (WHERE s.id IS NOT NULL),
            '[]'::json
        ) as skills
    FROM skill_categories sc
    LEFT JOIN skills s ON sc.name = s.skill_category
    WHERE sc.is_active = true
    GROUP BY sc.id, sc.name, sc.icon, sc.display_order
    ORDER BY sc.display_order;
END;
$$ LANGUAGE plpgsql;

-- 12. Create function to get project with all related data
CREATE OR REPLACE FUNCTION get_project_details(project_id_param INTEGER)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'project', row_to_json(p.*),
        'images', COALESCE(images_agg.images, '[]'::json),
        'skills', COALESCE(skills_agg.skills, '[]'::json)
    ) INTO result
    FROM projects p
    LEFT JOIN (
        SELECT 
            pi.project_id,
            json_agg(
                json_build_object(
                    'id', pi.id,
                    'image_url', pi.image_url,
                    'image_order', pi.image_order,
                    'alt_text', pi.alt_text,
                    'is_primary', pi.is_primary
                ) ORDER BY pi.image_order
            ) as images
        FROM project_images pi
        WHERE pi.project_id = project_id_param
        GROUP BY pi.project_id
    ) images_agg ON p.id = images_agg.project_id
    LEFT JOIN (
        SELECT 
            ps.project_id,
            json_agg(
                json_build_object(
                    'id', s.id,
                    'name', s.name,
                    'category', s.skill_category,
                    'icon_url', s.icon_url
                )
            ) as skills
        FROM project_skills ps
        JOIN skills s ON ps.skill_id = s.id
        WHERE ps.project_id = project_id_param
        GROUP BY ps.project_id
    ) skills_agg ON p.id = skills_agg.project_id
    WHERE p.id = project_id_param;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- End of SQL Updates
-- Remember to test these changes in a development environment first!

