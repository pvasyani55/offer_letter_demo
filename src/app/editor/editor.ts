import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../../services/employee.service';
import { TemplateService, Template } from '../../services/template.service';
import { OfferLetterService, OfferLetter } from '../../services/offer-letter.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateSelectorModalComponent } from '../template-selector-modal/template-selector-modal.component';
import grapesjs from 'grapesjs';

@Component({
  selector: 'app-editor',
  imports: [CommonModule, TemplateSelectorModalComponent],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor implements OnInit {
  editor: any;
  selectedCandidate: any;
  previewHtml = '';
  savedTemplates: any[] = [];
  predefinedTemplates: Template[] = [];
  showTemplateModal = false;
  selectedTemplatePreview: Template | null = null;
  candidates: any[] = [];

  constructor(private employeeService: EmployeeService, private templateService: TemplateService, private offerLetterService: OfferLetterService, private route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {}

  async initPredefinedTemplates() {
    try {
      // Load templates from backend
      const templates = await this.templateService.getTemplates().toPromise();
      this.predefinedTemplates = templates || [];
    } catch (error) {
      console.error('Failed to load templates from backend, using fallback templates:', error);
    }
  }

  async ngOnInit() {
    console.log('Initializing GrapesJS editor...');
    
    // Wait for initialization to complete
    await this.initPredefinedTemplates();
    await this.initEditor();
  
    // Check for query parameters and load specific employee
    this.route.queryParams.subscribe(params => {
      const employeeId = params['employeeId'];
      const templateId = params['templateId'];
      
      if (employeeId) {
        this.loadEmployeeById(+employeeId).then(() => {
          if (templateId) {
            this.autoLoadTemplate(+templateId);
          }
        });
      }
    });
  }

  async loadCandidates() {
    try {
      // Load employees from backend as candidates
      const response = await this.employeeService.getEmployees().toPromise();
      if (response && response.data) {
        this.candidates = response.data
        console.log('Candidates loaded:', this.candidates);
      }
    } catch (error) {
      console.error('Failed to load candidates from backend:', error);
    }
  }

  async loadEmployeeById(employeeId: number): Promise<void> {
    console.log('Loading employee by ID:', employeeId);
    try {
      const employee = await this.employeeService.getEmployee(employeeId).toPromise();
      if (employee) {
        console.log('Employee loaded:', employee);
        // Convert Employee to candidate format
        this.selectedCandidate = {
          id: employee.id,
          name: employee.name,
          candidateName: employee.candidateName,
          candidateAddress: employee.candidateAddress,
          position: employee.position,
          jobRole: employee.jobRole,
          salary: employee.salary,
          basicSalary: employee.basicSalary,
          basicMonthly: employee.basicMonthly,
          hra: employee.hra,
          hraMonthly: employee.hraMonthly,
          conveyance: employee.conveyance,
          conveyanceMonthly: employee.conveyanceMonthly,
          medical: employee.medical,
          lta: employee.lta,
          otherBenefits: employee.otherBenefits,
          otherMonthly: employee.otherMonthly,
          totalSalary: employee.totalSalary,
          totalMonthly: employee.totalMonthly,
          joiningDate: employee.joiningDate,
          offerExpiryDate: employee.offerExpiryDate,
          currentDate: employee.currentDate,
          year: employee.year,
          candidateId: employee.candidateId,
          companyName: employee.companyName,
          companyAddress: employee.companyAddress,
          companyInitials: employee.companyInitials,
          companyTagline: employee.companyTagline,
          companyMission: employee.companyMission,
          hrName: employee.hrName,
          hrPosition: employee.hrPosition,
          reportingManager: employee.reportingManager,
          workLocation: employee.workLocation,
          isActive: employee.isActive
        };
        this.cd.detectChanges();
      }
    } catch (error) {
      console.error('Failed to load employee by ID:', error);
    }
  }

  async autoLoadTemplate(templateId: number) {
    // Wait for editor to be ready
    if (!this.editor) {
      console.warn('Editor not ready, retrying in 500ms...');
      setTimeout(() => this.autoLoadTemplate(templateId), 500);
      return;
    }
    
    // First try to find template in predefinedTemplates from backend
    const template = this.predefinedTemplates.find(t => t.id === templateId);
    if (template && template.previewHtml) {
      this.editor.setComponents(template.previewHtml);
      
      // Apply only template-specific CSS from database
      if (template.css) {
        this.editor.setStyle(template.css);
      }
      this.selectedTemplatePreview = template;
      // Update placeholders after template loads (if employee is selected)
      setTimeout(() => this.updatePlaceholders(), 100);
      return;
    }
  }

  async initEditor(): Promise<void> {
    this.editor = grapesjs.init({
      container: '#gjs',
      height: '100%',
      width: '100%',
      fromElement: false,
      storageManager: false,
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
        ]
      },
      styleManager: {
        sectors: [{
          name: 'General',
          open: false,
          buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
        },{
          name: 'Flex',
          open: false,
          buildProps: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content', 'order', 'flex-basis', 'flex-grow', 'flex-shrink', 'align-self'],
        },{
          name: 'Dimension',
          open: false,
          buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
        },{
          name: 'Typography',
          open: false,
          buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow'],
        },{
          name: 'Decorations',
          open: false,
          buildProps: ['border-radius-c', 'background-color', 'border', 'box-shadow', 'background'],
        },{
          name: 'Extra',
          open: false,
          buildProps: ['opacity', 'transition', 'perspective', 'transform'],
        }]
      }
    });

    console.log('Editor initialized, setting up canvas and blocks...');
    // Fetch field blocks from backend then initialize
    const fieldBlocks = await this.employeeService.getEntityFields().toPromise();
    this.addCustomBlocks(fieldBlocks || []);
    this.addCommands();
    
    console.log('Editor setup complete!');
  }

  addCustomBlocks(fieldBlocks: Array<{ key: string; label: string; category: string }>) {
    const bm = this.editor.BlockManager;

    // Header Block
    bm.add('header', {
      label: 'Header Section',
      category: 'Layout',
      content: `
        <div class="header-section">
          <img src="https://via.placeholder.com/150x50/007bff/white?text=Company+Logo" style="max-width: 150px; margin-bottom: 10px;" />
          <h1 style="color: #007bff; margin: 0;">{{companyName}}</h1>
          <p style="margin: 5px 0; color: #666;">{{companyAddress}}</p>
        </div>
      `
    });

    // Text Block
    bm.add('text-block', {
      label: 'Text Block',
      category: 'Content',
      content: `
        <div class="text-block">
          <p>Dear <span class="placeholder">{{candidateName}}</span>,</p>
          <p>We are pleased to offer you the position of <span class="placeholder">{{jobRole}}</span> with an annual salary of <span class="placeholder">{{salary}}</span>.</p>
        </div>
      `,
      droppable: true
    });

    // Heading Block
    bm.add('heading', {
      label: 'Heading',
      category: 'Content',
      content: '<h2 style="color: #333; margin: 20px 0 10px 0;">Heading Text</h2>'
    });

    // Image Block
    bm.add('image-block', {
      label: 'Image',
      category: 'Media',
      content: {
        type: 'image',
        style: { width: '200px', height: 'auto' },
        attributes: { src: 'https://via.placeholder.com/200x100/e0e0e0/666?text=Image' }
      }
    });

    // Divider Block
    bm.add('divider', {
      label: 'Divider',
      category: 'Layout',
      content: '<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />'
    });

    // Table Block
    bm.add('salary-table', {
      label: 'Salary Table',
      category: 'Content',
      content: `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;"><span>Component</span></th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;"><span>Amount</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><span>Basic salary</span></td>
              <td style="border: 1px solid #ddd; padding-right: 8px; text-align: right;"><span class="placeholder">{{basicSalary}}</span></td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">HRA</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><span class="placeholder">{{hra}}</span></td>
            </tr>
            <tr style="background: #f8f9fa; font-weight: bold;">
              <td style="border: 1px solid #ddd; padding: 8px;">Total</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><span class="placeholder">{{totalSalary}}</span></td>
            </tr>
          </tbody>
        </table>
        <style>
      .salary-table { 
        width: 100%; 
        border-collapse: collapse; 
      }
      .salary-table th, .salary-table td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      .salary-table th {
        background: #f8f9fa;
      }
    </style>
      `
    });

    // Footer Block
    bm.add('footer', {
      label: 'Footer Section',
      category: 'Layout',
      content: `
        <div class="footer-section">
          <p>Best Regards,</p>
          <p style="margin: 10px 0;"><strong>{{hrName}}</strong></p>
          <p style="margin: 5px 0; color: #666;">{{hrPosition}}</p>
          <p style="margin: 5px 0; color: #666;">{{companyName}}</p>
          <p style="margin: 5px 0; color: #666;">Joining Date: <span class="placeholder">{{joiningDate}}</span></p>
        </div>
      `
    });

    // Dynamic Field Blocks - fetched from backend Employee entity
    fieldBlocks.forEach(field => {
      bm.add(`field-${field.key}`, {
        label: field.label,
        category: field.category,
        content: {
          type: 'text',
          content: `<span class="placeholder">{{${field.key}}} </span>`,
          style: { 
            display: 'inline',
            background: '#e3f2fd',
            padding: '2px 4px',
            'border-radius': '3px',
            color: '#1976d2',
            'font-weight': '500',
            'user-select': 'none'
          },
          selectable: true,
          editable: true,
          droppable: false,
          removable: true
        }
      });
    });
  }

  addCommands() {
    // Add image upload command
    this.editor.Commands.add('upload-image', {
      run: (editor: any) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
              const selected = editor.getSelected();
              if (selected && selected.get('type') === 'image') {
                selected.set('attributes', { src: event.target.result });
              }
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      }
    });

    // Add save template command
    this.editor.Commands.add('save-template', {
      run: (editor: any) => {
        this.saveTemplate();
      }
    });

    // Add load template command
    this.editor.Commands.add('load-template', {
      run: (editor: any) => {
        this.showTemplateSelector();
      }
    });
  }

  selectCandidate(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.selectedCandidate = this.candidates.find(c => c.id == id);
    if (this.selectedCandidate) {
      this.updatePlaceholders();
    }
  }

  updatePlaceholders() {
    if (!this.selectedCandidate) return;
    const html = this.editor.getHtml();
    let processedHtml = html;
    Object.keys(this.selectedCandidate).forEach(key => {
      const placeholder = `{{${key}}}`;
      let value = this.selectedCandidate[key];
      // Format numbers with commas (Indian locale)
      if (typeof value === 'number') {
        value = value.toLocaleString('en-IN');
      }
      processedHtml = processedHtml.replace(new RegExp(placeholder, 'g'), value);
    });
    this.editor.setComponents(processedHtml);
  }

  replaceTemplate(template: string, data: any) {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
      return data[key.trim()] || '';
    });
  }

  preview() {
    if (!this.selectedCandidate) {
      alert('Please select a candidate first');
      return;
    }

    const html = this.editor.getHtml();
    const css = this.editor.getCss();    

    // Create clean HTML with only the offer letter content
    const cleanHtml = this.createCleanOfferLetterHTML(html, css);

    // Open in new window for preview
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    if (previewWindow) {
      previewWindow.document.write(cleanHtml);
      previewWindow.document.close();
    } else {
      alert('Please allow popups for this site to preview');
    }
  }

  async saveTemplate() {
    const html = this.editor.getHtml();
    const css = this.editor.getCss();
    const templateName = prompt('Enter template name:') || `Template ${Date.now()}`;

    console.log('Saving template with data:', { htmlLength: html?.length, cssLength: css?.length, name: templateName });
    
    try {
      const response = await this.templateService.saveTemplate({
        html,
        css,
        name: templateName
      }).toPromise();
      
      console.log('Template save response:', response);
      
      if (response) {
        alert('Template saved successfully to database!');
        // Optionally refresh templates list
        await this.initPredefinedTemplates();
      } else {
        alert('Template saved but no response received');
      }
    } catch (error: any) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Error: ' + (error?.message || JSON.stringify(error) || 'Unknown error'));
    }
  }

  loadTemplate(template: any) {
    console.log('loadTemplate', template);
    
    this.editor.setComponents(template.html);
    this.editor.setStyle(template.css);
  }

  showTemplateSelector() {
    const templateNames = this.savedTemplates.map((t, i) => `${i + 1}. ${t.name}`).join('\n');
    const choice = prompt(`Select template number:\n${templateNames}`);

    if (choice) {
      const index = parseInt(choice) - 1;
      if (this.savedTemplates[index]) {
        this.loadTemplate(this.savedTemplates[index]);
      }
    }
  }

  createCleanOfferLetterHTML(html: string, css: string): string {
    // Extract only the offer-letter content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Find the offer-letter container or use the entire content
    let offerLetterContent = '';

    // Try to find offer-letter class first
    const offerLetter = tempDiv.querySelector('.offer-letter');
    if (offerLetter) {
      offerLetterContent = offerLetter.innerHTML;
    } else {
      // If no offer-letter class, look for common containers or use all content
      const containers = tempDiv.querySelectorAll('div');
      if (containers.length > 0) {
        // Use the first meaningful container
        offerLetterContent = containers[0].innerHTML || html;
      } else {
        offerLetterContent = html;
      }
    }

    // Replace placeholders with candidate data
    const processedHtml = this.replaceTemplate(offerLetterContent, this.selectedCandidate);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Offer Letter - ${this.selectedCandidate.candidateName}</title>
          <style>
            ${css}
            /* Print-specific styles */
            @media print {
              body {
                margin: 0;
                padding: 0;
                font-family: 'Roboto', Arial, sans-serif;
                font-size: 12pt;
                line-height: 1.4;
                color: #333;
                background: white;
              }

              .offer-letter-content {
                width: 210mm !important;
                min-height: 297mm !important;
                margin: 0 !important;
                padding: 25mm !important;
                box-shadow: none !important;
                background: white !important;
                position: relative !important;
              }

              /* Hide any editor-specific elements */
              .gjs-selected,
              .gjs-highlighter,
              .gjs-placeholder,
              .gjs-no-select,
              .gjs-comp-selected {
                display: none !important;
              }

              /* Ensure proper page breaks */
              .page-break {
                page-break-before: always;
              }

              /* Table styling for print */
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
              }

              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }

              th {
                background-color: #f8f9fa;
                font-weight: bold;
              }

              /* Hide scrollbars and ensure colors print */
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }

              /* Ensure images don't break layout */
              img {
                max-width: 100%;
                height: auto;
              }
            }

            /* Screen styles for print preview */
            body {
              margin: 20px;
              background: #f5f5f5;
              font-family: 'Roboto', Arial, sans-serif;
            }

            .offer-letter-content {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background: white;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              padding: 25mm;
              font-size: 12pt;
              line-height: 1.4;
              color: #333;
            }

            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 10px 20px;
              background: #007bff;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 14px;
              z-index: 1000;
            }

            .print-button:hover {
              background: #0056b3;
            }

            @media screen {
              .print-button {
                display: block;
              }
            }

            @media print {
              .print-button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <button class="print-button" onclick="window.print()">Print PDF</button>
          <div class="offer-letter-content">
            ${processedHtml}
          </div>
        </body>
      </html>
    `;
  }

  openTemplateSelector() {
    this.showTemplateModal = true;
  }

  closeTemplateSelector() {
    this.showTemplateModal = false;
    this.selectedTemplatePreview = null;
  }

  selectTemplate(template: any) {
    this.selectedTemplatePreview = template;
  }

  onTemplateSelected(template: Template): void {
    this.selectedTemplatePreview = template; 
  }

  onTemplateApplied(template: Template): void {  
    // Apply selected template to editor
    if (template.previewHtml) {
      this.editor.setComponents(template.previewHtml);
      
      // Apply only template-specific CSS from database
      if (template.css) {
        console.log('Setting editor styles...');
        this.editor.setStyle(template.css);
      }
    } else {
      console.warn('No previewHtml found in template');
    }
    
    // Update the selected template preview
    this.selectedTemplatePreview = template;
    
    // Show preview
    setTimeout(() => {
      this.preview();
    }, 100);
    this.closeTemplateSelector();
  }

  saveOfferLetter() { 
    if (!this.selectedCandidate) {
      alert('Please select a candidate first');
      return;
    }

    // Save the current offer letter to backend
    const html = this.editor.getHtml();
    const css = this.editor.getCss();

    const offerLetterData: Partial<OfferLetter> = {
      employeeId: this.selectedCandidate.id,
      employeeName: this.selectedCandidate.candidateName,
      htmlContent: html,
      cssContent: css,
      templateId: this.selectedTemplatePreview?.id,
      status: 'generated'
    };

    this.offerLetterService.createOfferLetter(offerLetterData).subscribe({
      next: (result) => {
        alert('Offer letter saved successfully!');
      },
      error: (error) => {
        console.error('Error saving offer letter:', error);
        alert('Failed to save offer letter. Error: ' + (error.message || 'Unknown error'));
      }
    });
  }
}


