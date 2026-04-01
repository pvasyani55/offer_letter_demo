-- Supabase SQL setup script
-- Run this in your Supabase SQL editor to create the templates table

CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  thumbnail_bg TEXT,
  tags TEXT[],
  preview_html TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all
CREATE POLICY "Allow read access" ON templates
  FOR SELECT USING (true);

-- Create policy to allow insert for all
CREATE POLICY "Allow insert access" ON templates
  FOR INSERT WITH CHECK (true);

-- Create policy to allow update for all
CREATE POLICY "Allow update access" ON templates
  FOR UPDATE USING (true);

-- Create policy to allow delete for all
CREATE POLICY "Allow delete access" ON templates
  FOR DELETE USING (true);

-- Create index for better performance
CREATE INDEX idx_templates_name ON templates(name);
CREATE INDEX idx_templates_tags ON templates USING GIN(tags);

-- Create offer_letters table
CREATE TABLE offer_letters (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  employee_name VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  css_content TEXT NOT NULL,
  pdf_content TEXT,
  template_id INTEGER,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'generated', 'sent', 'accepted')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security) for offer_letters
ALTER TABLE offer_letters ENABLE ROW LEVEL SECURITY;

-- Create policies for offer_letters
CREATE POLICY "Allow read access on offer_letters" ON offer_letters
  FOR SELECT USING (true);

CREATE POLICY "Allow insert access on offer_letters" ON offer_letters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update access on offer_letters" ON offer_letters
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete access on offer_letters" ON offer_letters
  FOR DELETE USING (true);

-- Create indexes for offer_letters
CREATE INDEX idx_offer_letters_employee_id ON offer_letters(employee_id);
CREATE INDEX idx_offer_letters_status ON offer_letters(status);
CREATE INDEX idx_offer_letters_created_at ON offer_letters(created_at DESC);
