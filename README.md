# Offer Letter UI

A drag-and-drop WYSIWYG editor for creating professional offer letters using GrapesJS.

## Features

- **Drag-and-Drop Editor**: Visual editor similar to WordPress with GrapesJS
- **A4 Page Layout**: Proper margins and corporate styling
- **Custom Blocks**:
  - Header section with company logo and name
  - Text blocks with rich formatting
  - Images (company logo, signatures)
  - Divider lines
  - Salary breakdown tables
  - Footer with signature and HR details
- **Dynamic Placeholders**: Support for {{candidateName}}, {{jobRole}}, {{salary}}, etc.
- **Rich Text Editing**: Bold, italic, alignment, font size controls
- **Image Upload**: Support for uploading images
- **Template Management**: Save and load offer letter templates
- **Preview Mode**: Real-time preview with candidate data
- **PDF Generation**: Print-ready PDF output

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Usage

1. **Navigate to Editor**: Go to `/offer` or `/editor` route
2. **Select Candidate**: Choose a candidate from the dropdown
3. **Build Template**:
   - Drag blocks from the left panel
   - Edit text and placeholders
   - Upload images
   - Style elements using the style manager
4. **Preview**: Click "Preview" to see the rendered offer letter
5. **Save Template**: Save your template for reuse
6. **Generate PDF**: Use browser print or implement backend PDF service

### Placeholders

The editor supports these dynamic placeholders:
- `{{candidateName}}` - Candidate's full name
- `{{jobRole}}` - Position title
- `{{salary}}` - Total salary
- `{{basicSalary}}` - Basic salary component
- `{{hra}}` - HRA component
- `{{totalSalary}}` - Total salary
- `{{joiningDate}}` - Joining date
- `{{companyName}}` - Company name
- `{{companyAddress}}` - Company address
- `{{hrName}}` - HR manager name
- `{{hrPosition}}` - HR position title

## Project Structure

```
src/
├── app/
│   ├── app.routes.ts          # Routing configuration
│   ├── app.html               # Main app template
│   ├── app.ts                 # Main app component
│   └── editor/                # Offer letter editor
│       ├── editor.html        # Editor template
│       ├── editor.scss        # Editor styles
│       └── editor.ts          # Editor component
```

## Technologies Used

- **Angular 21**: Frontend framework
- **GrapesJS**: Drag-and-drop page builder
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Styling with CSS preprocessor

## Backend Integration

The editor is designed to work with a backend API. Update the HTTP calls in `editor.ts` to connect to your API endpoints:

- `GET /candidate` - Fetch candidates
- `POST /template` - Save templates
- `POST /offer/generate` - Generate PDFs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
