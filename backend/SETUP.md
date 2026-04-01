# Backend Setup Guide

## Prerequisites

1. **Install Node.js dependencies:**
```bash
cd backend
npm install
```

2. **Configure Database:**
   - Update `.env` file with your Supabase PostgreSQL connection string
   - Example format: `postgresql://postgres.ypgkgvsyfrslucbdtbfr:offer_letter@123@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres`

## Project Structure

```
backend/
├── src/
│   ├── app/
│   │   ├── templates/
│   │   │   ├── template.entity.ts     # TypeORM entity
│   │   │   ├── templates.service.ts   # Business logic
│   │   │   ├── templates.controller.ts # REST endpoints
│   │   │   └── templates.module.ts   # Module definition
│   ├── app.module.ts               # Root module with TypeORM config
│   └── main.ts                  # Application entry point
├── package.json
├── tsconfig.json
└── .env
```

## Database Schema (TypeORM Entity)

The `Template` entity includes all required fields:

```typescript
@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  icon: string;

  @Column({ type: 'text', nullable: true })
  thumbnailBg: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'text' })
  previewHtml: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
```

## API Endpoints

### GET /templates
- **Description**: Fetch all templates
- **Response**: Array of Template objects
- **Example**: `GET http://localhost:3000/templates`

### POST /templates
- **Description**: Create a new template
- **Body**: Partial<Template> object
- **Response**: Created Template object
- **Example**: `POST http://localhost:3000/templates`

## Running the Application

1. **Development Mode:**
```bash
npm run start:dev
```

2. **Production Mode:**
```bash
npm run build
npm run start:prod
```

3. **Seed Database:**
```bash
npm run seed
```

## Frontend Integration

The Angular frontend is already configured to fetch templates from:
```typescript
const templates = await this.http.get<any[]>('http://localhost:3000/templates').toPromise();
```

## Features Implemented

✅ **TypeORM Integration**: Full entity-based database operations
✅ **PostgreSQL Support**: Direct database connection via Supabase
✅ **RESTful API**: Standard CRUD operations
✅ **Entity Relationships**: Proper database schema
✅ **Error Handling**: Comprehensive error management
✅ **Default Templates**: 4 pre-built templates included
✅ **Type Safety**: Full TypeScript support
✅ **Environment Configuration**: Secure credential management

## Next Steps

1. Run `npm install` to install dependencies
2. Update `.env` with your Supabase credentials
3. Start the backend with `npm run start:dev`
4. Run `npm run seed` to populate default templates
5. Test the API endpoints
6. The frontend will automatically load templates from the backend
