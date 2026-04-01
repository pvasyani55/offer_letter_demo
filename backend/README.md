# Offer Letter Backend

This is a NestJS backend service for managing offer letter templates with Supabase database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new Supabase project
   - Create a `templates` table with the following structure:
   ```sql
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
   ```

3. Configure environment variables:
   - Copy `.env` file and update with your Supabase credentials

4. Run the backend:
```bash
npm run start:dev
```

## API Endpoints

- `GET /templates` - Get all templates
- `POST /templates` - Create a new template

## Database Schema

The `templates` table stores:
- `id`: Auto-increment primary key
- `name`: Template name
- `description`: Template description
- `icon`: Icon representation
- `thumbnail_bg`: Thumbnail background CSS
- `tags`: Array of tags
- `preview_html`: HTML preview content
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
