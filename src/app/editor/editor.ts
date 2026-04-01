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
    
    console.log('Initialization complete, checking query params...');
    
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
    debugger
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
    console.log('Auto-loading template:', templateId);
    
    // Wait for editor to be ready
    if (!this.editor) {
      console.warn('Editor not ready, retrying in 500ms...');
      setTimeout(() => this.autoLoadTemplate(templateId), 500);
      return;
    }

    console.log('predefinedTemplates', this.predefinedTemplates);
    
    // First try to find template in predefinedTemplates from backend
    const template = this.predefinedTemplates.find(t => t.id === templateId);
    if (template && template.previewHtml) {
      console.log('Loading template from predefinedTemplates:', template.name);
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
    console.log('Setting up editor configuration...');
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
    await this.setupCanvas();
    this.addCustomBlocks();
    this.addCommands();
    
    console.log('Editor setup complete!');
  }

  async setupCanvas() {
    console.log('setupcanvas');
    
    // Set up A4 page layout
    this.editor.setStyle(`
      .gjs-canvas {
        background: #f8f9fa;
      }
      .offer-letter {
        width: 210mm;
        min-height: 297mm;
        margin: 20px auto;
        background: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
        padding: 25mm;
        font-family: 'Roboto', sans-serif;
        font-size: 12pt;
        line-height: 1.5;
        color: #333;
      }
      .header-section {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #007bff;
        padding-bottom: 20px;
      }
      .body-section {
        margin: 30px 0;
      }
      .footer-section {
        margin-top: 50px;
        text-align: center;
        border-top: 1px solid #ddd;
        padding-top: 20px;
      }
      .text-block {
        min-height: 60px;
        padding: 10px;
        border: 1px dashed #ccc;
        background: #fafafa;
      }
      .text-block:hover {
        border-color: #007bff;
        background: #f0f8ff;
      }
        .salary-table { 
        width: 100% !important; 
        border-collapse: collapse; 
      }
      .salary-table th, .salary-table td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      .salary-table th {
        background: #f8f9fa;
      }
      img {
        max-width: 100px;
        max-height: 100px;
        width: auto;
        height: auto;
        object-fit: contain;
      }
      .text-right {
        text-align: right;
      }
        .text-left {
        text-align: left;
      }
    `);
  }

  addCustomBlocks() {
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

    // Dynamic Field Blocks
    const fieldBlocks = [
      { key: 'candidateName', label: 'Candidate Name', category: 'Fields' },
      { key: 'candidateAddress', label: 'Candidate Address', category: 'Fields' },
      { key: 'position', label: 'Position', category: 'Fields' },
      { key: 'jobRole', label: 'Job Role', category: 'Fields' },
      { key: 'salary', label: 'Annual Salary', category: 'Fields' },
      { key: 'basicSalary', label: 'Basic Salary', category: 'Fields' },
      { key: 'basicMonthly', label: 'Basic Monthly', category: 'Fields' },
      { key: 'hra', label: 'HRA', category: 'Fields' },
      { key: 'hraMonthly', label: 'HRA Monthly', category: 'Fields' },
      { key: 'conveyance', label: 'Conveyance', category: 'Fields' },
      { key: 'conveyanceMonthly', label: 'Conveyance Monthly', category: 'Fields' },
      { key: 'medical', label: 'Medical Allowance', category: 'Fields' },
      { key: 'lta', label: 'LTA', category: 'Fields' },
      { key: 'otherBenefits', label: 'Other Benefits', category: 'Fields' },
      { key: 'otherMonthly', label: 'Other Monthly', category: 'Fields' },
      { key: 'totalSalary', label: 'Total Salary', category: 'Fields' },
      { key: 'totalMonthly', label: 'Total Monthly', category: 'Fields' },
      { key: 'joiningDate', label: 'Joining Date', category: 'Fields' },
      { key: 'offerExpiryDate', label: 'Offer Expiry Date', category: 'Fields' },
      { key: 'currentDate', label: 'Current Date', category: 'Fields' },
      { key: 'year', label: 'Year', category: 'Fields' },
      { key: 'candidateId', label: 'Candidate ID', category: 'Fields' },
      { key: 'companyName', label: 'Company Name', category: 'Fields' },
      { key: 'companyAddress', label: 'Company Address', category: 'Fields' },
      { key: 'companyInitials', label: 'Company Initials', category: 'Fields' },
      { key: 'companyTagline', label: 'Company Tagline', category: 'Fields' },
      { key: 'companyMission', label: 'Company Mission', category: 'Fields' },
      { key: 'hrName', label: 'HR Name', category: 'Fields' },
      { key: 'hrPosition', label: 'HR Position', category: 'Fields' },
      { key: 'reportingManager', label: 'Reporting Manager', category: 'Fields' },
      { key: 'workLocation', label: 'Work Location', category: 'Fields' }
    ];

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
      const value = this.selectedCandidate[key];
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
    console.log('css', css);
    

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

  // async generatePDF() {
  //   if (!this.selectedCandidate) {
  //     alert('Please select a candidate first');
  //     return;
  //   }

  //   // Use the previewHtml content for printing only the offer letter
  //   if (!this.previewHtml) {
  //     this.preview();
  //   }

  //   // Open in new window for printing
  //   const printWindow = window.open('', '_blank', 'width=800,height=600');
  //   if (printWindow) {
  //     printWindow.document.write(this.previewHtml);
  //     printWindow.document.close();
  //     printWindow.onload = () => {
  //       printWindow.print();
  //     };
  //   } else {
  //     alert('Please allow popups for this site to generate PDF');
  //   }
  // }

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
    console.log('selectedTemplate', this.selectedTemplatePreview);
    
  }

  onTemplateApplied(template: Template): void {
    console.log('Template applied:', template);
    console.log('Template previewHtml:', template.previewHtml);
    
    // Apply selected template to editor
    if (template.previewHtml) {
      console.log('Setting editor components...');
      this.editor.setComponents(template.previewHtml);
      console.log('Editor components set');
      
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
    console.log('saveOfferLetter called');
    
    if (!this.selectedCandidate) {
      alert('Please select a candidate first');
      return;
    }

    console.log('Selected candidate:', this.selectedCandidate);

    // Save the current offer letter to backend
    const html = this.editor.getHtml();
    const css = this.editor.getCss();

    console.log('HTML length:', html.length);
    console.log('CSS length:', css.length);

    const offerLetterData: Partial<OfferLetter> = {
      employeeId: this.selectedCandidate.id,
      employeeName: this.selectedCandidate.candidateName,
      htmlContent: html,
      cssContent: css,
      templateId: this.selectedTemplatePreview?.id,
      status: 'generated'
    };

    console.log('Offer letter data:', offerLetterData);

    this.offerLetterService.createOfferLetter(offerLetterData).subscribe({
      next: (result) => {
        console.log('Offer letter saved successfully:', result);
        alert('Offer letter saved successfully!');
      },
      error: (error) => {
        console.error('Error saving offer letter:', error);
        alert('Failed to save offer letter. Error: ' + (error.message || 'Unknown error'));
      }
    });
  }

  getTemplateContent(templateId: number) {
    const templates: any = {
      1: { // Classic Corporate
        html: `
          <div class="offer-letter classic-corporate">
            <div class="header-section">
              <div class="company-logo">
                <img src="https://via.placeholder.com/120x40/2c3e50/white?text=LOGO" alt="Company Logo" style="max-width: 120px; height: auto;" />
              </div>
              <div class="company-info">
                <h1 style="color: #2c3e50; margin: 10px 0; font-size: 24px;">{{companyName}}</h1>
                <p style="margin: 5px 0; color: #666; font-size: 14px;">{{companyAddress}}</p>
                <p style="margin: 5px 0; color: #666; font-size: 12px;">Phone: +1 (555) 123-4567 | Email: hr@company.com</p>
              </div>
            </div>

            <div class="letter-header">
              <div class="date" style="text-align: right; margin-bottom: 30px;">
                <p style="margin: 0; font-weight: 500;">Date: <span style="font-weight: normal;">{{currentDate}}</span></p>
              </div>

              <div class="recipient-info" style="margin-bottom: 30px;">
                <p style="margin: 0; line-height: 1.6;">
                  <span class="placeholder" style="font-weight: 500;">{{candidateName}}</span><br>
                  <span class="placeholder">{{candidateAddress}}</span>
                </p>
              </div>
            </div>

            <div class="body-section">
              <div class="subject" style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; margin: 0; font-size: 18px; text-decoration: underline;">Subject: Offer of Employment</h2>
              </div>

              <div class="salutation" style="margin-bottom: 20px;">
                <p style="margin: 0;">Dear <span class="placeholder" style="font-weight: 500;">{{candidateName}}</span>,</p>
              </div>

              <div class="content">
                <p style="margin-bottom: 15px; text-align: justify; line-height: 1.6;">
                  We are delighted to extend a formal offer of employment to you for the position of
                  <span class="placeholder" style="font-weight: 500;">{{jobRole}}</span> at {{companyName}}.
                  We believe your skills and experience will be a valuable addition to our team.
                </p>

                <p style="margin-bottom: 15px; text-align: justify; line-height: 1.6;">
                  Your starting date will be <span class="placeholder" style="font-weight: 500;">{{joiningDate}}</span>.
                  You will report to the <span class="placeholder">{{reportingManager}}</span> and will be based at our
                  <span class="placeholder">{{workLocation}}</span> office.
                </p>

                <div class="compensation-section" style="margin: 30px 0;">
                  <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 16px;">Compensation Package:</h3>

                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ddd;">
                    <thead>
                      <tr style="background: #f8f9fa;">
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: 600; color: #2c3e50;">Component</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: 600; color: #2c3e50;">Annual Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="border: 1px solid #ddd; padding: 12px;">Basic Salary</td>
                        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: 500;"><span class="placeholder">₹{{basicSalary}}</span></td>
                      </tr>
                      <tr style="background: #f9f9f9;">
                        <td style="border: 1px solid #ddd; padding: 12px;">House Rent Allowance (HRA)</td>
                        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: 500;"><span class="placeholder">₹{{hra}}</span></td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid #ddd; padding: 12px;">Conveyance Allowance</td>
                        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: 500;"><span class="placeholder">₹{{conveyance}}</span></td>
                      </tr>
                      <tr style="background: #f9f9f9;">
                        <td style="border: 1px solid #ddd; padding: 12px;">Medical Allowance</td>
                        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: 500;"><span class="placeholder">₹{{medical}}</span></td>
                      </tr>
                      <tr style="background: #2c3e50; color: white; font-weight: bold;">
                        <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">Total Annual Compensation</td>
                        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold;"><span class="placeholder">₹{{totalSalary}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style="margin-bottom: 15px; text-align: justify; line-height: 1.6;">
                  In addition to the above, you will be eligible for our standard benefits package including health insurance,
                  paid time off, and professional development opportunities.
                </p>

                <p style="margin-bottom: 15px; text-align: justify; line-height: 1.6;">
                  This offer is contingent upon satisfactory completion of background verification and reference checks.
                  Please sign and return this letter by <span class="placeholder" style="font-weight: 500;">{{offerExpiryDate}}</span>
                  to indicate your acceptance of this offer.
                </p>
              </div>
            </div>

            <div class="footer-section" style="margin-top: 50px;">
              <div class="signature-section" style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div class="acceptance" style="flex: 1; margin-right: 50px;">
                  <p style="margin-bottom: 40px; font-weight: 500;">Accepted by:</p>
                  <div style="border-bottom: 1px solid #ddd; width: 200px; margin-bottom: 5px;"></div>
                  <p style="margin: 0; font-size: 12px; color: #666;"><span class="placeholder">{{candidateName}}</span></p>
                  <p style="margin: 0; font-size: 12px; color: #666;">Date: _______________</p>
                </div>

                <div class="company-signature" style="flex: 1; text-align: center;">
                  <p style="margin-bottom: 40px; font-weight: 500;">For {{companyName}}:</p>
                  <div style="border-bottom: 1px solid #ddd; width: 200px; margin: 0 auto 5px auto;"></div>
                  <p style="margin: 0; font-size: 12px; color: #666;"><span class="placeholder">{{hrName}}</span></p>
                  <p style="margin: 0; font-size: 12px; color: #666;"><span class="placeholder">{{hrPosition}}</span></p>
                  <p style="margin: 0; font-size: 12px; color: #666;">{{companyName}}</p>
                </div>
              </div>
            </div>
          </div>
        `,
        css: `
          .classic-corporate {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #333;
          }
          .classic-corporate .header-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2c3e50;
          }
          .classic-corporate .company-logo img {
            max-height: 60px;
          }
          .classic-corporate .placeholder {
            background: #ecf0f1;
            border: 1px dashed #3498db;
            padding: 2px 4px;
            border-radius: 2px;
            color: #2980b9;
            font-weight: 500;
          }
        `
      },
      2: { // Modern Minimal
        html: `
          <div class="offer-letter modern-minimal">
            <div class="header-section">
              <div class="logo-container" style="text-align: center; margin-bottom: 30px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; margin-bottom: 15px;">
                  {{companyInitials}}
                </div>
                <h1 style="color: #333; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -1px;">{{companyName}}</h1>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px; font-weight: 400;">{{companyAddress}}</p>
              </div>
            </div>

            <div class="letter-meta" style="display: flex; justify-content: space-between; margin-bottom: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
              <div>
                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Offer Details</h3>
                <p style="margin: 0; color: #666; font-size: 14px;">Position: <span class="placeholder" style="font-weight: 500; color: #333;">{{jobRole}}</span></p>
                <p style="margin: 0; color: #666; font-size: 14px;">Start Date: <span class="placeholder" style="font-weight: 500; color: #333;">{{joiningDate}}</span></p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; color: #666; font-size: 14px;">Date: <span style="font-weight: 500; color: #333;">{{currentDate}}</span></p>
                <p style="margin: 0; color: #666; font-size: 14px;">Ref: <span style="font-weight: 500; color: #333;">OFF-{{candidateId}}-2026</span></p>
              </div>
            </div>

            <div class="recipient-section" style="margin-bottom: 30px;">
              <p style="margin: 0; font-size: 16px; color: #333;">
                <span class="placeholder" style="font-weight: 600;">{{candidateName}}</span><br>
                <span class="placeholder" style="color: #666;">{{candidateAddress}}</span>
              </p>
            </div>

            <div class="body-section">
              <div class="greeting" style="margin-bottom: 25px;">
                <p style="margin: 0; font-size: 18px; color: #333;">Dear <span class="placeholder" style="font-weight: 600;">{{candidateName}}</span>,</p>
              </div>

              <div class="main-content">
                <p style="margin-bottom: 20px; font-size: 15px; line-height: 1.7; color: #444;">
                  We're thrilled to extend this offer for the <span class="placeholder" style="font-weight: 600; color: #667eea;">{{jobRole}}</span> position at {{companyName}}.
                  Your expertise and passion align perfectly with our vision and culture.
                </p>

                <div class="highlight-box" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
                  <h3 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 300;">Annual Compensation</h3>
                  <p style="margin: 0; font-size: 36px; font-weight: 600;">₹<span class="placeholder">{{totalSalary}}</span></p>
                </div>

                <div class="compensation-breakdown" style="margin: 30px 0;">
                  <h4 style="color: #333; margin-bottom: 15px; font-size: 16px;">Compensation Breakdown</h4>
                  <div class="comp-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="comp-item" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                      <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Basic Salary</div>
                      <div style="font-size: 18px; font-weight: 600; color: #333;">₹<span class="placeholder">{{basicSalary}}</span></div>
                    </div>
                    <div class="comp-item" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #764ba2;">
                      <div style="font-size: 12px; color: #666; margin-bottom: 5px;">HRA</div>
                      <div style="font-size: 18px; font-weight: 600; color: #333;">₹<span class="placeholder">{{hra}}</span></div>
                    </div>
                    <div class="comp-item" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f093fb;">
                      <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Conveyance</div>
                      <div style="font-size: 18px; font-weight: 600; color: #333;">₹<span class="placeholder">{{conveyance}}</span></div>
                    </div>
                    <div class="comp-item" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #4facfe;">
                      <div style="font-size: 12px; color: #666; margin-bottom: 5px;">LTA</div>
                      <div style="font-size: 18px; font-weight: 600; color: #333;">₹<span class="placeholder">{{lta}}</span></div>
                    </div>
                  </div>
                </div>

                <div class="benefits-section" style="margin: 30px 0;">
                  <h4 style="color: #333; margin-bottom: 15px; font-size: 16px;">Additional Benefits</h4>
                  <div class="benefits-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    <div class="benefit-item" style="display: flex; align-items: center; padding: 8px 0;">
                      <span style="color: #667eea; margin-right: 10px;">✓</span>
                      <span style="font-size: 14px;">Health Insurance</span>
                    </div>
                    <div class="benefit-item" style="display: flex; align-items: center; padding: 8px 0;">
                      <span style="color: #667eea; margin-right: 10px;">✓</span>
                      <span style="font-size: 14px;">Paid Time Off (24 days)</span>
                    </div>
                    <div class="benefit-item" style="display: flex; align-items: center; padding: 8px 0;">
                      <span style="color: #667eea; margin-right: 10px;">✓</span>
                      <span style="font-size: 14px;">Learning Allowance</span>
                    </div>
                    <div class="benefit-item" style="display: flex; align-items: center; padding: 8px 0;">
                      <span style="color: #667eea; margin-right: 10px;">✓</span>
                      <span style="font-size: 14px;">Flexible Work Hours</span>
                    </div>
                  </div>
                </div>

                <p style="margin-bottom: 20px; font-size: 15px; line-height: 1.7; color: #444;">
                  This offer is valid until <span class="placeholder" style="font-weight: 600;">{{offerExpiryDate}}</span>.
                  To accept this offer, please sign and return this letter or reply to this email.
                </p>

                <p style="margin-bottom: 20px; font-size: 15px; line-height: 1.7; color: #444;">
                  We're excited about the possibility of you joining our team and contributing to our mission of
                  <span class="placeholder">{{companyMission}}</span>.
                </p>
              </div>
            </div>

            <div class="footer-section" style="margin-top: 50px; text-align: center;">
              <div class="signature-block" style="display: inline-block; text-align: center;">
                <p style="margin-bottom: 30px; font-weight: 500; color: #333;">Best regards,</p>
                <div style="width: 200px; height: 60px; border-bottom: 2px solid #667eea; margin: 0 auto 10px auto;"></div>
                <p style="margin: 0; font-weight: 600; color: #333;"><span class="placeholder">{{hrName}}</span></p>
                <p style="margin: 0; font-size: 13px; color: #666;"><span class="placeholder">{{hrPosition}}</span></p>
                <p style="margin: 0; font-size: 13px; color: #666;">{{companyName}}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">+1 (555) 123-4567 | hr@company.com</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .modern-minimal {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
          }
          .modern-minimal .placeholder {
            background: #e8f4f8;
            border: 1px dashed #667eea;
            padding: 2px 6px;
            border-radius: 4px;
            color: #667eea;
            font-weight: 500;
          }
          .modern-minimal .highlight-box {
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
          }
        `
      },
      3: { // Elegant Professional
        html: `
          <div class="offer-letter elegant-professional">
            <div class="header-section" style="text-align: center; margin-bottom: 40px; padding: 30px 0; border-bottom: 3px double #8b4513;">
              <div class="letterhead" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div class="company-seal" style="width: 60px; height: 60px; border: 2px solid #8b4513; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; color: #8b4513;">
                  {{companyInitials}}
                </div>
                <div class="company-details" style="text-align: center; flex: 1;">
                  <h1 style="color: #2f4f4f; margin: 0; font-size: 32px; font-family: 'Garamond', serif; font-weight: normal; letter-spacing: 2px;">{{companyName}}</h1>
                  <p style="margin: 5px 0; color: #666; font-size: 14px; font-style: italic;">{{companyTagline}}</p>
                  <p style="margin: 5px 0; color: #666; font-size: 12px;">{{companyAddress}}</p>
                </div>
                <div class="company-seal" style="width: 60px; height: 60px; border: 2px solid #8b4513; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; color: #8b4513;">
                  {{companyInitials}}
                </div>
              </div>
            </div>

            <div class="letter-meta" style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px;">
              <div>
                <p style="margin: 0; color: #666;">Reference: <span style="color: #333; font-weight: 500;">EMP-{{candidateId}}-{{year}}</span></p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; color: #666;">Date: <span style="color: #333; font-weight: 500;">{{currentDate}}</span></p>
              </div>
            </div>

            <div class="recipient-address" style="margin-bottom: 40px; font-size: 14px; line-height: 1.8;">
              <p style="margin: 0;">
                <span class="placeholder" style="font-weight: 600;">{{candidateName}}</span><br>
                <span class="placeholder">{{candidateAddress}}</span>
              </p>
            </div>

            <div class="subject-line" style="margin-bottom: 30px;">
              <p style="margin: 0; font-weight: 600; color: #2f4f4f; text-decoration: underline; font-size: 16px;">Subject: Formal Offer of Employment</p>
            </div>

            <div class="body-section">
              <div class="salutation" style="margin-bottom: 25px;">
                <p style="margin: 0; font-size: 16px;">Dear <span class="placeholder" style="font-weight: 600;">{{candidateName}}</span>,</p>
              </div>

              <div class="main-content" style="text-align: justify; font-size: 14px; line-height: 1.8; color: #333;">
                <p style="margin-bottom: 20px; text-indent: 30px;">
                  We are pleased to extend to you a formal offer of employment for the position of
                  <span class="placeholder" style="font-weight: 600; font-style: italic;">{{jobRole}}</span> within our esteemed organization.
                  This letter serves as our formal commitment to the terms and conditions outlined herein.
                </p>

                <p style="margin-bottom: 20px; text-indent: 30px;">
                  Your commencement date shall be <span class="placeholder" style="font-weight: 600;">{{joiningDate}}</span>,
                  whereupon you shall report to <span class="placeholder" style="font-weight: 600;">{{reportingManager}}</span>
                  at our <span class="placeholder">{{workLocation}}</span> facility.
                </p>

                <div class="compensation-section" style="margin: 40px 0; padding: 30px; background: #faf9f6; border: 2px solid #d4af37; border-radius: 8px;">
                  <h3 style="color: #2f4f4f; margin: 0 0 25px 0; text-align: center; font-size: 20px; font-family: 'Garamond', serif; border-bottom: 1px solid #d4af37; padding-bottom: 10px;">Compensation & Remuneration</h3>

                  <div class="salary-highlight" style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); color: white; border-radius: 6px;">
                    <p style="margin: 0 0 5px 0; font-size: 14px; opacity: 0.9;">Annual Gross Compensation</p>
                    <p style="margin: 0; font-size: 32px; font-weight: bold; font-family: 'Garamond', serif;">₹<span class="placeholder">{{totalSalary}}</span></p>
                  </div>

                  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <thead>
                      <tr style="background: #2f4f4f; color: white;">
                        <th style="border: 1px solid #d4af37; padding: 15px; text-align: left; font-weight: 600; font-family: 'Garamond', serif;">Salary Component</th>
                        <th style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600; font-family: 'Garamond', serif;">Monthly Amount</th>
                        <th style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600; font-family: 'Garamond', serif;">Annual Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background: #faf9f6;">
                        <td style="border: 1px solid #d4af37; padding: 15px; font-weight: 500;">Basic Salary</td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{basicMonthly}}</span></td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{basicSalary}}</span></td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid #d4af37; padding: 15px; font-weight: 500;">House Rent Allowance</td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{hraMonthly}}</span></td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{hra}}</span></td>
                      </tr>
                      <tr style="background: #faf9f6;">
                        <td style="border: 1px solid #d4af37; padding: 15px; font-weight: 500;">Conveyance Allowance</td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{conveyanceMonthly}}</span></td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{conveyance}}</span></td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid #d4af37; padding: 15px; font-weight: 500;">LTA & Other Benefits</td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{otherMonthly}}</span></td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: 600;">₹<span class="placeholder">{{otherBenefits}}</span></td>
                      </tr>
                      <tr style="background: #2f4f4f; color: white; font-weight: bold;">
                        <td style="border: 1px solid #d4af37; padding: 15px; font-weight: bold; font-family: 'Garamond', serif;">Total Compensation</td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: bold; font-family: 'Garamond', serif;">₹<span class="placeholder">{{totalMonthly}}</span></td>
                        <td style="border: 1px solid #d4af37; padding: 15px; text-align: right; font-weight: bold; font-family: 'Garamond', serif;">₹<span class="placeholder">{{totalSalary}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="benefits-section" style="margin: 30px 0;">
                  <h4 style="color: #2f4f4f; margin-bottom: 15px; font-size: 16px; font-family: 'Garamond', serif;">Additional Benefits & Perquisites</h4>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                    <div style="background: #faf9f6; padding: 15px; border: 1px solid #d4af37; border-radius: 4px;">
                      <h5 style="margin: 0 0 10px 0; color: #2f4f4f; font-size: 14px;">Health & Insurance</h5>
                      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                        <li>Comprehensive Health Insurance</li>
                        <li>Personal Accident Coverage</li>
                        <li>Term Life Insurance</li>
                      </ul>
                    </div>
                    <div style="background: #faf9f6; padding: 15px; border: 1px solid #d4af37; border-radius: 4px;">
                      <h5 style="margin: 0 0 10px 0; color: #2f4f4f; font-size: 14px;">Leave & Time Off</h5>
                      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                        <li>24 days Annual Leave</li>
                        <li>12 days Sick Leave</li>
                        <li>Maternity/Paternity Leave</li>
                      </ul>
                    </div>
                    <div style="background: #faf9f6; padding: 15px; border: 1px solid #d4af37; border-radius: 4px;">
                      <h5 style="margin: 0 0 10px 0; color: #2f4f4f; font-size: 14px;">Professional Development</h5>
                      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                        <li>Training & Development Budget</li>
                        <li>Conference Attendance</li>
                        <li>Certification Support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p style="margin-bottom: 20px; text-indent: 30px;">
                  This offer is contingent upon satisfactory reference checks and background verification.
                  Should you accept this offer, please sign and return this letter by
                  <span class="placeholder" style="font-weight: 600;">{{offerExpiryDate}}</span>.
                </p>

                <p style="margin-bottom: 20px; text-indent: 30px;">
                  We look forward to welcoming you to the {{companyName}} family and embarking on this exciting journey together.
                </p>
              </div>
            </div>

            <div class="footer-section" style="margin-top: 60px;">
              <div class="closing" style="margin-bottom: 40px;">
                <p style="margin: 0; font-weight: 500;">Yours sincerely,</p>
              </div>

              <div class="signature-section" style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div class="candidate-signature" style="flex: 1;">
                  <p style="margin-bottom: 50px; font-weight: 500; font-size: 14px;">Accepted by:</p>
                  <div style="border-bottom: 1px solid #2f4f4f; width: 250px; margin-bottom: 5px;"></div>
                  <p style="margin: 0; font-size: 12px; color: #666;"><span class="placeholder">{{candidateName}}</span></p>
                  <p style="margin: 0; font-size: 12px; color: #666;">Date: ________________</p>
                </div>

                <div class="company-signature" style="flex: 1; text-align: center;">
                  <div style="width: 200px; height: 80px; border-bottom: 2px solid #2f4f4f; margin: 0 auto 10px auto;"></div>
                  <p style="margin: 0; font-weight: 600; color: #2f4f4f; font-family: 'Garamond', serif;"><span class="placeholder">{{hrName}}</span></p>
                  <p style="margin: 0; font-size: 13px; color: #666;"><span class="placeholder">{{hrPosition}}</span></p>
                  <p style="margin: 0; font-size: 13px; color: #666;">{{companyName}}</p>
                  <p style="margin: 0; font-size: 12px; color: #666;">Contact: +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        `,
        css: `
          .elegant-professional {
            font-family: 'Times New Roman', serif;
            font-size: 13px;
            line-height: 1.7;
            color: #333;
            max-width: 850px;
            margin: 0 auto;
          }
          .elegant-professional .placeholder {
            background: #f5f5dc;
            border: 1px dashed #8b4513;
            padding: 2px 4px;
            border-radius: 2px;
            color: #8b4513;
            font-weight: 500;
          }
        `
      },
      4: { // Tech Startup
        html: `
          <div class="offer-letter tech-startup">
            <div class="header-section" style="text-align: center; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%); border-radius: 15px; color: white;">
              <div class="logo-container" style="margin-bottom: 20px;">
                <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 36px; font-weight: bold; backdrop-filter: blur(10px);">
                  {{companyInitials}}
                </div>
              </div>
              <h1 style="margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">{{companyName}}</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 300;">Building the future, one innovation at a time</p>
            </div>

            <div class="quick-info" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
              <div class="info-card" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #ff6b6b; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 5px;">🎯</div>
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Position</div>
                <div style="font-size: 16px; font-weight: 600; color: #333;"><span class="placeholder">{{jobRole}}</span></div>
              </div>
              <div class="info-card" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #4ecdc4; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 5px;">📅</div>
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Start Date</div>
                <div style="font-size: 16px; font-weight: 600; color: #333;"><span class="placeholder">{{joiningDate}}</span></div>
              </div>
              <div class="info-card" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #45b7d1; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 5px;">💰</div>
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Annual Package</div>
                <div style="font-size: 16px; font-weight: 600; color: #333;">₹<span class="placeholder">{{totalSalary}}</span></div>
              </div>
              <div class="info-card" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #f9ca24; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 5px;">📍</div>
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Location</div>
                <div style="font-size: 16px; font-weight: 600; color: #333;"><span class="placeholder">{{workLocation}}</span></div>
              </div>
            </div>

            <div class="body-section">
              <div class="greeting" style="margin-bottom: 30px;">
                <p style="margin: 0; font-size: 20px; color: #333; font-weight: 500;">Hey <span class="placeholder" style="color: #ff6b6b; font-weight: 600;">{{candidateName}}</span>! 👋</p>
              </div>

              <div class="main-content" style="font-size: 16px; line-height: 1.7; color: #444;">
                <p style="margin-bottom: 25px;">
                  We're absolutely thrilled that you're considering joining our awesome team at {{companyName}}!
                  After reviewing your incredible background and experience, we're confident you'll be a perfect fit
                  for our <span class="placeholder" style="font-weight: 600; color: #ff6b6b;">{{jobRole}}</span> position.
                </p>

                <div class="excited-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center;">
                  <h3 style="margin: 0 0 15px 0; font-size: 24px;">🎉 Welcome to the Team! 🎉</h3>
                  <p style="margin: 0; font-size: 18px; opacity: 0.9;">Your journey with us starts on <span class="placeholder" style="font-weight: 600;">{{joiningDate}}</span></p>
                </div>

                <div class="compensation-section" style="margin: 40px 0;">
                  <h4 style="color: #333; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center;">
                    💰 Your Compensation Package
                  </h4>

                  <div class="salary-breakdown" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div class="salary-card" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 25px; border-radius: 12px; text-align: center; color: white;">
                      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Basic Salary</div>
                      <div style="font-size: 28px; font-weight: 700;">₹<span class="placeholder">{{basicSalary}}</span></div>
                      <div style="font-size: 12px; opacity: 0.8;">per annum</div>
                    </div>
                    <div class="salary-card" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 25px; border-radius: 12px; text-align: center; color: #333;">
                      <div style="font-size: 14px; opacity: 0.7; margin-bottom: 10px;">HRA</div>
                      <div style="font-size: 28px; font-weight: 700; color: #ff6b6b;">₹<span class="placeholder">{{hra}}</span></div>
                      <div style="font-size: 12px; opacity: 0.6;">per annum</div>
                    </div>
                    <div class="salary-card" style="background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); padding: 25px; border-radius: 12px; text-align: center; color: #333;">
                      <div style="font-size: 14px; opacity: 0.7; margin-bottom: 10px;">Conveyance</div>
                      <div style="font-size: 28px; font-weight: 700; color: #4ecdc4;">₹<span class="placeholder">{{conveyance}}</span></div>
                      <div style="font-size: 12px; opacity: 0.6;">per annum</div>
                    </div>
                  </div>

                  <div class="total-comp" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 20px 0;">
                    <div style="font-size: 16px; opacity: 0.9; margin-bottom: 10px;">Your Total Annual Compensation</div>
                    <div style="font-size: 48px; font-weight: 900; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">₹<span class="placeholder">{{totalSalary}}</span></div>
                  </div>
                </div>

                <div class="perks-section" style="margin: 40px 0;">
                  <h4 style="color: #333; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center;">
                    🎁 Amazing Perks & Benefits
                  </h4>

                  <div class="perks-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div class="perk-item" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #ff6b6b; display: flex; align-items: center;">
                      <span style="font-size: 24px; margin-right: 15px;">🏥</span>
                      <div>
                        <div style="font-weight: 600; color: #333;">Health Insurance</div>
                        <div style="font-size: 12px; color: #666;">Comprehensive coverage</div>
                      </div>
                    </div>
                    <div class="perk-item" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #4ecdc4; display: flex; align-items: center;">
                      <span style="font-size: 24px; margin-right: 15px;">🏖️</span>
                      <div>
                        <div style="font-weight: 600; color: #333;">Unlimited PTO</div>
                        <div style="font-size: 12px; color: #666;">Take time when you need it</div>
                      </div>
                    </div>
                    <div class="perk-item" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #45b7d1; display: flex; align-items: center;">
                      <span style="font-size: 24px; margin-right: 15px;">📚</span>
                      <div>
                        <div style="font-weight: 600; color: #333;">Learning Budget</div>
                        <div style="font-size: 12px; color: #666;">$2000 for courses & books</div>
                      </div>
                    </div>
                    <div class="perk-item" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #f9ca24; display: flex; align-items: center;">
                      <span style="font-size: 24px; margin-right: 15px;">🏠</span>
                      <div>
                        <div style="font-weight: 600; color: #333;">Remote Work</div>
                        <div style="font-size: 12px; color: #666;">Work from anywhere</div>
                      </div>
                    </div>
                    <div class="perk-item" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9ff3; display: flex; align-items: center;">
                      <span style="font-size: 24px; margin-right: 15px;">🍕</span>
                      <div>
                        <div style="font-weight: 600; color: #333;">Free Lunch</div>
                        <div style="font-size: 12px; color: #666;">Daily team meals</div>
                      </div>
                    </div>
                    <div class="perk-item" style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #54a0ff; display: flex; align-items: center;">
                      <span style="font-size: 24px; margin-right: 15px;">🎮</span>
                      <div>
                        <div style="font-weight: 600; color: #333;">Game Room</div>
                        <div style="font-size: 12px; color: #666;">Foosball, ping pong & more</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="next-steps" style="background: #e8f4f8; padding: 25px; border-radius: 10px; border-left: 5px solid #4ecdc4; margin: 30px 0;">
                  <h4 style="margin: 0 0 15px 0; color: #333; display: flex; align-items: center;">
                    🚀 Next Steps
                  </h4>
                  <ol style="margin: 0; padding-left: 20px; color: #555;">
                    <li style="margin-bottom: 8px;">Sign and return this offer letter by <span class="placeholder" style="font-weight: 600;">{{offerExpiryDate}}</span></li>
                    <li style="margin-bottom: 8px;">Complete background verification process</li>
                    <li style="margin-bottom: 8px;">Set up your workstation and accounts</li>
                    <li>Welcome to the team! 🎊</li>
                  </ol>
                </div>

                <p style="margin-bottom: 25px; font-size: 16px;">
                  We're beyond excited to have you join our mission to <span class="placeholder">{{companyMission}}</span>.
                  This is just the beginning of an amazing journey together!
                </p>

                <p style="margin-bottom: 25px; font-size: 16px;">
                  Questions? Reach out to <span class="placeholder" style="font-weight: 600;">{{hrName}}</span> anytime.
                  We're here to make your onboarding as smooth as possible.
                </p>
              </div>
            </div>

            <div class="footer-section" style="margin-top: 50px; text-align: center;">
              <div class="signature-section" style="display: inline-block; text-align: center;">
                <p style="margin-bottom: 20px; font-size: 18px; color: #333; font-weight: 500;">Can't wait to work with you! 🤝</p>

                <div style="width: 250px; height: 80px; border-bottom: 3px solid #ff6b6b; margin: 0 auto 15px auto; border-radius: 2px;"></div>

                <p style="margin: 0; font-size: 18px; font-weight: 700; color: #333;"><span class="placeholder">{{hrName}}</span></p>
                <p style="margin: 0; font-size: 14px; color: #666;"><span class="placeholder">{{hrPosition}}</span></p>
                <p style="margin: 0; font-size: 14px; color: #666;">{{companyName}}</p>
                <p style="margin: 0; font-size: 12px; color: #999;">📧 hr@company.com | 📱 +1 (555) 123-4567</p>

                <div class="social-links" style="margin-top: 20px;">
                  <span style="margin: 0 10px; font-size: 20px;">📘</span>
                  <span style="margin: 0 10px; font-size: 20px;">🐦</span>
                  <span style="margin: 0 10px; font-size: 20px;">💼</span>
                  <span style="margin: 0 10px; font-size: 20px;">🌐</span>
                </div>
              </div>
            </div>
          </div>
        `,
        css: `
          .tech-startup {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
          }
          .tech-startup .placeholder {
            background: #fff3cd;
            border: 2px dashed #ffc107;
            padding: 3px 8px;
            border-radius: 6px;
            color: #856404;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `
      }
    };

    return templates[templateId] || templates[1];
  }
}


