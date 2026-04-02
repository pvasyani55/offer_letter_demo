import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find();
  }

  async create(createTemplateDto: Partial<Template>): Promise<Template> {
    const template = this.templateRepository.create({
      ...createTemplateDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.templateRepository.save(template);
  }

  async saveTemplate(templateData: { html: string; css: string; name: string }): Promise<Template> {
    const template = this.templateRepository.create({
      name: templateData.name,
      previewHtml: templateData.html,
      css: templateData.css,
      description: `Template created from editor`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.templateRepository.save(template);
  }

  async seedDefaultTemplates(): Promise<void> {
    const defaultTemplates = [
      {
        id: 1,
        name: 'Executive Professional',
        description: 'Sophisticated design for senior-level positions with premium styling',
        icon: '👔',
        thumbnailBg: 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
        tags: ['Executive', 'Premium', 'Professional'],
        previewHtml: `
          <div class="offer-letter">
            <div class="letterhead">
              <div class="company-info">
                <h1 class="company-name">{{companyName}}</h1>
                <div class="company-details">
                  <p>{{companyAddress}}</p>
                  <p class="contact-info">Phone: +1 (555) 123-4567 | Email: hr@{{companyName|lowercase}}.com</p>
                </div>
              </div>
              <div class="letter-date">
                <p>{{currentDate}}</p>
              </div>
            </div>

            <div class="recipient-info">
              <p><strong>{{candidateName}}</strong></p>
              <p>{{candidateAddress}}</p>
            </div>

            <div class="subject-line">
              <p><strong>Subject: Employment Offer - {{jobRole}}</strong></p>
            </div>

            <div class="salutation">
              <p>Dear {{candidateName}},</p>
            </div>

            <div class="letter-body">
              <p>We are delighted to extend a formal offer of employment for the position of <strong>{{jobRole}}</strong> at {{companyName}}. After careful consideration of your qualifications and experience, we believe you will be a valuable addition to our team.</p>

              <div class="compensation-section">
                <h3>Compensation Package</h3>
                <div class="salary-breakdown">
                  <table class="salary-table">
                    <thead>
                      <tr>
                        <th><span>Component</span></th>
                        <th><span>Monthly (₹)</span></th>
                        <th><span>Annual (₹)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span>Basic Salary</span></td>
                        <td class="amount"><span>{{basicMonthly}}</span></td>
                        <td class="amount"><span>{{basicSalary}}</span></td>
                      </tr>
                      <tr>
                        <td><span>House Rent Allowance</span></td>
                        <td class="amount"><span>{{hraMonthly}}</span></td>
                        <td class="amount"><span>{{hra}}</span></td>
                      </tr>
                      <tr>
                        <td><span>Conveyance Allowance</span></td>
                        <td class="amount"><span>{{conveyanceMonthly}}</span></td>
                        <td class="amount"><span>{{conveyance}}</span></td>
                      </tr>
                      <tr>
                        <td><span>Medical Allowance</span></td>
                        <td class="amount"><span>{{medical}}</span></td>
                        <td class="amount"><span>{{medical}}</span></td>
                      </tr>
                      <tr class="total-row">
                        <td><strong>Total Compensation</strong></td>
                        <td class="amount"><strong>{{totalMonthly}}</strong></td>
                        <td class="amount"><strong>{{totalSalary}}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="terms-section">
                <h3>Terms of Employment</h3>
                <ul class="terms-list">
                  <li><strong>Position:</strong> <span>{{jobRole}}</span></li>
                  <li><strong>Reporting Manager:</strong> <span>{{reportingManager}}</span></li>
                  <li><strong>Work Location:</strong> <span>{{workLocation}}</span></li>
                  <li><strong>Joining Date:</strong> <span>{{joiningDate}}</span></li>
                  <li><strong>Probation Period:</strong> <span>6 months</span></li>
                </ul>
              </div>

              <p>This offer is contingent upon satisfactory completion of background verification and medical examination. We request you to confirm your acceptance by {{offerExpiryDate}}.</p>

              <p>We look forward to welcoming you to the <span>{{companyName}}</span> family and contributing to our shared success.</p>
            </div>

            <div class="closing">
              <p>Best regards,</p>
              <div class="signature-block">
                <p><strong>{{hrName}}</strong></p>
                <p>{{hrPosition}}</p>
                <p>{{companyName}}</p>
                <p>Contact: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Georgia', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #2d3748;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
            position: relative;
          }

          .letterhead {
            border-bottom: 3px solid #1a365d;
            padding-bottom: 25px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .company-name {
            font-size: 28pt;
            font-weight: bold;
            color: #1a365d;
            margin: 0 0 10px 0;
            letter-spacing: 1px;
          }

          .company-details {
            flex: 1;
          }

          .company-details p {
            margin: 3px 0;
            color: #4a5568;
          }

          .contact-info {
            font-size: 9pt;
            color: #718096;
            font-style: italic;
          }

          .letter-date {
            text-align: right;
            font-weight: 500;
            color: #2d3748;
          }

          .recipient-info {
            margin-bottom: 25px;
            line-height: 1.8;
          }

          .subject-line {
            background: #f7fafc;
            padding: 15px 20px;
            margin: 25px 0;
            border-left: 4px solid #1a365d;
            font-weight: bold;
            color: #1a365d;
          }

          .salutation {
            margin: 25px 0;
            font-weight: 500;
          }

          .letter-body p {
            margin-bottom: 15px;
            text-align: justify;
          }

          .compensation-section {
            margin: 30px 0;
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .compensation-section h3 {
            color: #1a365d;
            font-size: 14pt;
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #1a365d;
          }

          .salary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            font-size: 10pt;
          }

          .salary-table th {
            background: #1a365d;
            color: white;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #2d3748;
          }

          .salary-table td {
            padding: 12px 15px;
            border: 1px solid #cbd5e0;
            background: white;
          }

          .salary-table .amount {
            text-align: right;
            font-weight: 500;
            font-family: 'Courier New', monospace;
          }

          .salary-table .total-row {
            background: #edf2f7;
            font-weight: bold;
          }

          .salary-table .total-row td {
            border-top: 2px solid #1a365d;
          }

          .terms-section {
            margin: 30px 0;
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .terms-section h3 {
            color: #1a365d;
            font-size: 14pt;
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #1a365d;
          }

          .terms-list {
            list-style: none;
            padding: 0;
          }

          .terms-list li {
            margin-bottom: 8px;
            padding: 5px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .terms-list li:last-child {
            border-bottom: none;
          }

          .closing {
            margin-top: 40px;
            text-align: left;
          }

          .signature-block {
            margin-top: 30px;
          }

          .signature-block p {
            margin: 5px 0;
            line-height: 1.4;
          }

          .signature-block strong {
            font-size: 12pt;
            color: #1a365d;
          }
        `
      },
      {
        id: 2,
        name: 'Corporate Standard',
        description: 'Professional corporate template with clean typography and formal layout',
        icon: '🏢',
        thumbnailBg: 'linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%)',
        tags: ['Corporate', 'Standard', 'Professional'],
        previewHtml: `
          <div class="offer-letter">
            <div class="header">
              <div class="company-branding">
                <h1>{{companyName}}</h1>
                <p class="tagline">{{companyTagline}}</p>
              </div>
              <div class="letter-meta">
                <p class="date">{{currentDate}}</p>
                <p class="ref">Ref: EMP/{{candidateId}}/{{year}}</p>
              </div>
            </div>

            <div class="recipient-address">
              <p>{{candidateName}}</p>
              <p>{{candidateAddress}}</p>
            </div>

            <div class="subject">
              <strong>Subject: Offer of Employment</strong>
            </div>

            <div class="greeting">
              <p>Dear {{candidateName}},</p>
            </div>

            <div class="content">
              <p>We are pleased to offer you employment with {{companyName}} in the position of <strong>{{jobRole}}</strong>. This letter serves as a formal offer of employment contingent upon satisfactory completion of pre-employment requirements.</p>

              <div class="salary-info">
                <h3>Compensation Details</h3>
                <table class="compensation-table">
                  <thead>
                    <tr>
                      <th><span>Description</span></th>
                      <th><span>Monthly Amount</span></th>
                      <th><span>Annual Amount</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Basic Salary</span></td>
                      <td class="currency"><span>{{basicMonthly}}</span></td>
                      <td class="currency"><span>{{basicSalary}}</span></td>
                    </tr>
                    <tr>
                      <td><span>HRA</span></td>
                      <td class="currency"><span>{{hraMonthly}}</span></td>
                      <td class="currency"><span>{{hra}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Conveyance</span></td>
                      <td class="currency"><span>{{conveyanceMonthly}}</span></td>
                      <td class="currency"><span>{{conveyance}}</span></td>
                    </tr>
                    <tr>
                      <td><span>LTA</span></td>
                      <td class="currency"><span>{{lta}}</span></td>
                      <td class="currency"><span>{{lta}}</span></td>
                    </tr>
                    <tr class="total">
                      <td><strong>Total CTC</strong></td>
                      <td class="currency"><strong>{{totalMonthly}}</strong></td>
                      <td class="currency"><strong>{{totalSalary}}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="employment-terms">
                <h3>Terms & Conditions</h3>
                <ul>
                  <li><strong>Position:</strong> {{jobRole}}</li>
                  <li><strong>Department:</strong> {{reportingManager}}</li>
                  <li><strong>Location:</strong> {{workLocation}}</li>
                  <li><strong>Joining Date:</strong> {{joiningDate}}</li>
                  <li><strong>Notice Period:</strong> 30 days</li>
                </ul>
              </div>

              <p>Please sign and return this letter by {{offerExpiryDate}} to indicate your acceptance of this offer.</p>

              <p>We welcome you to the {{companyName}} team and look forward to your contributions.</p>
            </div>

            <div class="signature-section">
              <p>For {{companyName}}</p>
              <div class="signature-line">
                <p>_______________________________</p>
                <p><strong>{{hrName}}</strong></p>
                <p>{{hrPosition}}</p>
                <p>{{companyName}}</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #2d3748;
            max-width: 750px;
            margin: 0 auto;
            padding: 40px;
            background: white;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2b6cb0;
          }

          .company-branding h1 {
            font-size: 24pt;
            color: #2b6cb0;
            margin: 0 0 5px 0;
            font-weight: bold;
          }

          .tagline {
            color: #4a5568;
            font-style: italic;
            margin: 0;
            font-size: 10pt;
          }

          .letter-meta {
            text-align: right;
          }

          .letter-meta p {
            margin: 2px 0;
            font-size: 10pt;
            color: #4a5568;
          }

          .recipient-address {
            margin: 25px 0;
            line-height: 1.8;
          }

          .subject {
            background: #f7fafc;
            padding: 12px 20px;
            margin: 20px 0;
            border-left: 4px solid #2b6cb0;
            font-weight: bold;
            color: #2b6cb0;
          }

          .greeting {
            margin: 25px 0;
            font-weight: 500;
          }

          .content p {
            margin-bottom: 15px;
            text-align: justify;
          }

          .salary-info, .employment-terms {
            margin: 25px 0;
            background: #f8fafc;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
          }

          .salary-info h3, .employment-terms h3 {
            color: #2b6cb0;
            font-size: 13pt;
            margin: 0 0 15px 0;
            border-bottom: 1px solid #2b6cb0;
            padding-bottom: 8px;
          }

          .compensation-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          .compensation-table th {
            background: #2b6cb0;
            color: white;
            padding: 10px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #2d3748;
          }

          .compensation-table td {
            padding: 10px;
            border: 1px solid #cbd5e0;
            background: white;
          }

          .compensation-table .currency {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
          }

          .compensation-table .total {
            background: #edf2f7;
            font-weight: bold;
          }

          .compensation-table .total td {
            border-top: 2px solid #2b6cb0;
          }

          .employment-terms ul {
            margin: 0;
            padding-left: 20px;
          }

          .employment-terms li {
            margin-bottom: 8px;
          }

          .signature-section {
            margin-top: 40px;
            text-align: left;
          }

          .signature-line {
            margin-top: 40px;
          }

          .signature-line p {
            margin: 5px 0;
            line-height: 1.4;
          }
        `
      },
      {
        id: 3,
        name: 'Modern Professional',
        description: 'Contemporary design with clean lines and professional color scheme',
        icon: '💼',
        thumbnailBg: 'linear-gradient(135deg, #4a5568 0%, #718096 100%)',
        tags: ['Modern', 'Professional', 'Clean'],
        previewHtml: `
          <div class="offer-letter">
            <div class="header-section">
              <div class="brand-section">
                <div class="company-logo">{{companyInitials}}</div>
                <div class="company-info">
                  <h1>{{companyName}}</h1>
                  <p>{{companyTagline}}</p>
                </div>
              </div>
              <div class="document-info">
                <p class="date">{{currentDate}}</p>
                <p class="doc-type">EMPLOYMENT OFFER</p>
              </div>
            </div>

            <div class="divider"></div>

            <div class="candidate-details">
              <h3>Candidate Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Name:</span>
                  <span class="value">{{candidateName}}</span>
                </div>
                <div class="info-item">
                  <span class="label">Position:</span>
                  <span class="value">{{jobRole}}</span>
                </div>
                <div class="info-item">
                  <span class="label">Employee ID:</span>
                  <span class="value">{{candidateId}}</span>
                </div>
                <div class="info-item">
                  <span class="label">Joining Date:</span>
                  <span class="value">{{joiningDate}}</span>
                </div>
              </div>
            </div>

            <div class="letter-content">
              <p>Dear {{candidateName}},</p>

              <p>Following our discussions, we are pleased to offer you the position of <strong>{{jobRole}}</strong> at {{companyName}}. We believe your skills and experience will be valuable assets to our organization.</p>

              <div class="compensation-package">
                <h3>Compensation Package</h3>
                <div class="salary-overview">
                  <div class="total-ctc">
                    <span class="label">Annual Package</span>
                    <span class="amount">{{totalSalary}}</span>
                  </div>
                </div>

                <table class="salary-breakdown">
                  <thead>
                    <tr>
                      <th><span>Salary Component</span></th>
                      <th><span>Monthly</span></th>
                      <th><span>Annual</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Basic Salary</span></td>
                      <td class="amount-cell"><span>{{basicMonthly}}</span></td>
                      <td class="amount-cell"><span>{{basicSalary}}</span></td>
                    </tr>
                    <tr>
                      <td><span>HRA</span></td>
                      <td class="amount-cell"><span>{{hraMonthly}}</span></td>
                      <td class="amount-cell"><span>{{hra}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Conveyance Allowance</span></td>
                      <td class="amount-cell"><span>{{conveyanceMonthly}}</span></td>
                      <td class="amount-cell"><span>{{conveyance}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Medical Allowance</span></td>
                      <td class="amount-cell"><span>{{medical}}</span></td>
                      <td class="amount-cell"><span>{{medical}}</span></td>
                    </tr>
                    <tr class="total-row">
                      <td><strong>Total</strong></td>
                      <td class="amount-cell"><strong>{{totalMonthly}}</strong></td>
                      <td class="amount-cell"><strong>{{totalSalary}}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="terms-conditions">
                <h3>Terms & Conditions</h3>
                <div class="terms-grid">
                  <div class="term">
                    <span class="term-label">Reporting Manager:</span>
                    <span class="term-value">{{reportingManager}}</span>
                  </div>
                  <div class="term">
                    <span class="term-label">Work Location:</span>
                    <span class="term-value">{{workLocation}}</span>
                  </div>
                  <div class="term">
                    <span class="term-label">Probation Period:</span>
                    <span class="term-value">6 months</span>
                  </div>
                  <div class="term">
                    <span class="term-label">Notice Period:</span>
                    <span class="term-value">30 days</span>
                  </div>
                </div>
              </div>

              <p>This offer is valid until {{offerExpiryDate}}. Please confirm your acceptance by signing and returning this letter.</p>

              <p>We look forward to your positive response and welcome you to the {{companyName}} team.</p>
            </div>

            <div class="footer-section">
              <div class="signature-area">
                <p>Best regards,</p>
                <div class="signature">
                  <p class="name">{{hrName}}</p>
                  <p class="position">{{hrPosition}}</p>
                  <p class="company">{{companyName}}</p>
                  <p class="contact">HR Department</p>
                </div>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Segoe UI', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #2d3748;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
          }

          .header-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .brand-section {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .company-logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4a5568 0%, #718096 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18pt;
            font-weight: bold;
            color: white;
          }

          .company-info h1 {
            font-size: 22pt;
            color: #2d3748;
            margin: 0 0 5px 0;
            font-weight: 600;
          }

          .company-info p {
            color: #718096;
            margin: 0;
            font-style: italic;
          }

          .document-info {
            text-align: right;
          }

          .date {
            font-weight: 500;
            color: #4a5568;
            margin: 0 0 5px 0;
          }

          .doc-type {
            font-size: 12pt;
            font-weight: bold;
            color: #4a5568;
            letter-spacing: 1px;
          }

          .divider {
            height: 2px;
            background: linear-gradient(90deg, #4a5568 0%, #e2e8f0 100%);
            margin: 20px 0 30px 0;
          }

          .candidate-details {
            margin-bottom: 30px;
          }

          .candidate-details h3 {
            color: #2d3748;
            font-size: 14pt;
            margin: 0 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #4a5568;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .info-item:last-child {
            border-bottom: none;
          }

          .label {
            font-weight: 600;
            color: #4a5568;
          }

          .value {
            color: #2d3748;
          }

          .letter-content p {
            margin-bottom: 15px;
            text-align: justify;
          }

          .compensation-package {
            margin: 30px 0;
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .compensation-package h3 {
            color: #2d3748;
            font-size: 14pt;
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #4a5568;
          }

          .salary-overview {
            text-align: center;
            margin-bottom: 25px;
          }

          .total-ctc {
            display: inline-block;
            background: white;
            padding: 20px 30px;
            border-radius: 8px;
            border: 2px solid #4a5568;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .total-ctc .label {
            display: block;
            font-size: 10pt;
            color: #718096;
            margin-bottom: 5px;
          }

          .total-ctc .amount {
            font-size: 18pt;
            font-weight: bold;
            color: #2d3748;
            font-family: 'Courier New', monospace;
          }

          .salary-breakdown {
            width: 100%;
            border-collapse: collapse;
          }

          .salary-breakdown th {
            background: #4a5568;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #2d3748;
          }

          .salary-breakdown td {
            padding: 12px;
            border: 1px solid #cbd5e0;
            background: white;
          }

          .amount-cell {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
          }

          .total-row {
            background: #edf2f7;
            font-weight: bold;
          }

          .total-row td {
            border-top: 2px solid #4a5568;
          }

          .terms-conditions {
            margin: 30px 0;
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .terms-conditions h3 {
            color: #2d3748;
            font-size: 14pt;
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #4a5568;
          }

          .terms-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .term {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .term-label {
            font-weight: 600;
            color: #4a5568;
          }

          .term-value {
            color: #2d3748;
            text-align: right;
            flex: 1;
          }

          .footer-section {
            margin-top: 40px;
            text-align: left;
          }

          .signature-area p {
            margin: 0 0 5px 0;
          }

          .signature {
            margin-top: 30px;
          }

          .signature .name {
            font-weight: bold;
            font-size: 12pt;
            color: #2d3748;
            margin-bottom: 3px;
          }

          .signature .position,
          .signature .company,
          .signature .contact {
            margin: 2px 0;
            color: #718096;
            font-size: 10pt;
          }
        `
      },
      {
        id: 4,
        name: 'Enterprise Standard',
        description: 'Formal enterprise template suitable for large organizations',
        icon: '🏛️',
        thumbnailBg: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        tags: ['Enterprise', 'Formal', 'Large Organization'],
        previewHtml: `
          <div class="offer-letter">
            <div class="corporate-header">
              <div class="letterhead">
                <h1 class="company-title">{{companyName}}</h1>
                <div class="corporate-info">
                  <p>{{companyAddress}}</p>
                  <p class="corporate-contact">Corporate Headquarters | www.{{companyName|lowercase}}.com</p>
                </div>
              </div>
              <div class="letter-metadata">
                <p class="issue-date">{{currentDate}}</p>
                <p class="confidential">CONFIDENTIAL</p>
              </div>
            </div>

            <div class="formal-addressing">
              <p class="recipient-name">{{candidateName}}</p>
              <p class="recipient-address">{{candidateAddress}}</p>
            </div>

            <div class="formal-subject">
              <p><strong>FORMAL OFFER OF EMPLOYMENT</strong></p>
              <p><strong>Position: {{jobRole}}</strong></p>
            </div>

            <div class="formal-greeting">
              <p>Dear {{candidateName}},</p>
            </div>

            <div class="formal-content">
              <p>{{companyName}} is pleased to extend a formal offer of employment for the position of <strong>{{jobRole}}</strong>. This offer represents our confidence in your abilities and our commitment to your professional development within our organization.</p>

              <div class="compensation-details">
                <h3>COMPENSATION STRUCTURE</h3>
                <div class="compensation-summary">
                  <div class="ctc-highlight">
                    <span class="ctc-label">Cost to Company (Annual)</span>
                    <span class="ctc-value">{{totalSalary}}</span>
                  </div>
                </div>

                <table class="formal-salary-table">
                  <thead>
                    <tr>
                      <th><span>Compensation Element</span></th>
                      <th><span>Monthly Amount</span></th>
                      <th><span>Annual Amount</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Basic Salary</span></td>
                      <td class="monetary">{{basicMonthly}}</td>
                      <td class="monetary">{{basicSalary}}</td>
                    </tr>
                    <tr>
                      <td><span>House Rent Allowance</span></td>
                      <td class="monetary"><span>{{hraMonthly}}</span></td>
                      <td class="monetary"><span>{{hra}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Conveyance Allowance</span></td>
                      <td class="monetary"><span>{{conveyanceMonthly}}</span></td>
                      <td class="monetary"><span>{{conveyance}}</span></td>
                    </tr>
                    <tr>
                      <td><span>LTA</span></td>
                      <td class="monetary"><span>{{lta}}</span></td>
                      <td class="monetary"><span>{{lta}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Medical Allowance</span></td>
                      <td class="monetary"><span>{{medical}}</span></td>
                      <td class="monetary"><span>{{medical}}</span></td>
                    </tr>
                    <tr class="grand-total">
                      <td><strong>GRAND TOTAL</strong></td>
                      <td class="monetary"><strong><span>{{totalMonthly}}</span></strong></td>
                      <td class="monetary"><strong><span>{{totalSalary}}</span></strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="employment-conditions">
                <h3>EMPLOYMENT CONDITIONS</h3>
                <div class="conditions-list">
                  <div class="condition-item">
                    <span class="condition-label">Reporting Structure:</span>
                    <span class="condition-value">{{reportingManager}}</span>
                  </div>
                  <div class="condition-item">
                    <span class="condition-label">Work Location:</span>
                    <span class="condition-value">{{workLocation}}</span>
                  </div>
                  <div class="condition-item">
                    <span class="condition-label">Commencement Date:</span>
                    <span class="condition-value">{{joiningDate}}</span>
                  </div>
                  <div class="condition-item">
                    <span class="condition-label">Probationary Period:</span>
                    <span class="condition-value">6 months</span>
                  </div>
                  <div class="condition-item">
                    <span class="condition-label">Notice Period:</span>
                    <span class="condition-value">90 days</span>
                  </div>
                </div>
              </div>

              <p>This offer letter is subject to satisfactory completion of background verification, reference checks, and medical examination. The offer must be accepted in writing by {{offerExpiryDate}}.</p>

              <p>{{companyName}} is committed to providing a professional work environment and development opportunities. We look forward to your contributions to our continued success.</p>
            </div>

            <div class="formal-closing">
              <p>Yours sincerely,</p>
              <div class="executive-signature">
                <div class="signature-line">_______________________________</div>
                <p class="signatory-name">{{hrName}}</p>
                <p class="signatory-title">{{hrPosition}}</p>
                <p class="company-name-footer">{{companyName}}</p>
                <p class="contact-details">Human Resources Department</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.7;
            color: #1a202c;
            max-width: 850px;
            margin: 0 auto;
            padding: 50px;
            background: white;
            border: 1px solid #2d3748;
          }

          .corporate-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-bottom: 25px;
            border-bottom: 3px solid #1a202c;
          }

          .letterhead {
            flex: 1;
          }

          .company-title {
            font-size: 28pt;
            font-weight: bold;
            color: #1a202c;
            margin: 0 0 15px 0;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .corporate-info p {
            margin: 5px 0;
            color: #4a5568;
            font-size: 10pt;
          }

          .corporate-contact {
            font-style: italic;
            color: #718096;
          }

          .letter-metadata {
            text-align: right;
          }

          .issue-date {
            font-weight: bold;
            color: #1a202c;
            margin: 0 0 10px 0;
          }

          .confidential {
            background: #fed7d7;
            color: #c53030;
            padding: 5px 15px;
            border-radius: 4px;
            font-size: 9pt;
            font-weight: bold;
            letter-spacing: 1px;
          }

          .formal-addressing {
            margin: 30px 0;
            line-height: 1.8;
          }

          .recipient-name {
            font-weight: bold;
            font-size: 13pt;
            color: #1a202c;
          }

          .formal-subject {
            background: #f7fafc;
            padding: 20px;
            margin: 30px 0;
            border-left: 5px solid #1a202c;
            border-radius: 0 8px 8px 0;
          }

          .formal-subject p {
            margin: 0;
            font-weight: bold;
            color: #1a202c;
            font-size: 13pt;
          }

          .formal-greeting {
            margin: 30px 0;
            font-weight: 500;
            font-size: 13pt;
          }

          .formal-content p {
            margin-bottom: 18px;
            text-align: justify;
          }

          .compensation-details {
            margin: 35px 0;
            background: #f8fafc;
            padding: 30px;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
          }

          .compensation-details h3 {
            color: #1a202c;
            font-size: 15pt;
            margin: 0 0 25px 0;
            padding-bottom: 12px;
            border-bottom: 3px solid #1a202c;
            text-align: center;
            letter-spacing: 1px;
          }

          .compensation-summary {
            text-align: center;
            margin-bottom: 30px;
          }

          .ctc-highlight {
            display: inline-block;
            background: white;
            padding: 25px 40px;
            border-radius: 8px;
            border: 3px solid #1a202c;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }

          .ctc-label {
            display: block;
            font-size: 11pt;
            color: #718096;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .ctc-value {
            font-size: 22pt;
            font-weight: bold;
            color: #1a202c;
            font-family: 'Courier New', monospace;
          }

          .formal-salary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border: 2px solid #1a202c;
          }

          .formal-salary-table th {
            background: #1a202c;
            color: white;
            padding: 15px 12px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #2d3748;
            font-size: 11pt;
          }

          .formal-salary-table td {
            padding: 15px 12px;
            border: 1px solid #cbd5e0;
            background: white;
            font-size: 11pt;
          }

          .formal-salary-table .monetary {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
          }

          .grand-total {
            background: #edf2f7;
            font-weight: bold;
            font-size: 12pt;
          }

          .grand-total td {
            border-top: 3px solid #1a202c;
            padding: 18px 12px;
          }

          .employment-conditions {
            margin: 35px 0;
            background: #f8fafc;
            padding: 30px;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
          }

          .employment-conditions h3 {
            color: #1a202c;
            font-size: 15pt;
            margin: 0 0 25px 0;
            padding-bottom: 12px;
            border-bottom: 3px solid #1a202c;
            text-align: center;
            letter-spacing: 1px;
          }

          .conditions-list {
            display: grid;
            gap: 12px;
          }

          .condition-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .condition-item:last-child {
            border-bottom: none;
          }

          .condition-label {
            font-weight: bold;
            color: #4a5568;
            flex: 0 0 200px;
          }

          .condition-value {
            color: #1a202c;
            text-align: right;
            flex: 1;
          }

          .formal-closing {
            margin-top: 50px;
            text-align: left;
          }

          .executive-signature {
            margin-top: 40px;
          }

          .signature-line {
            width: 250px;
            height: 40px;
            border-bottom: 2px solid #1a202c;
            margin-bottom: 15px;
          }

          .signatory-name {
            font-weight: bold;
            font-size: 13pt;
            color: #1a202c;
            margin-bottom: 5px;
          }

          .signatory-title,
          .company-name-footer,
          .contact-details {
            margin: 3px 0;
            color: #718096;
            font-size: 10pt;
          }
        `
      },
      {
        id: 5,
        name: 'Professional Blue',
        description: 'Clean professional template with sophisticated blue color scheme',
        icon: '🔵',
        thumbnailBg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        tags: ['Professional', 'Blue', 'Clean'],
        previewHtml: `
          <div class="offer-letter">
            <div class="header-professional">
              <div class="company-section">
                <h1 class="company-name-pro">{{companyName}}</h1>
                <p class="company-tagline">{{companyTagline}}</p>
                <div class="company-address">{{companyAddress}}</div>
              </div>
              <div class="letter-info">
                <p class="letter-date">{{currentDate}}</p>
                <p class="letter-ref">Reference: EMP-{{candidateId}}-{{year}}</p>
              </div>
            </div>

            <div class="candidate-section">
              <p class="candidate-name">{{candidateName}}</p>
              <p class="candidate-address-full">{{candidateAddress}}</p>
            </div>

            <div class="subject-professional">
              <strong>Subject: Employment Offer Letter</strong>
            </div>

            <div class="greeting-professional">
              <p>Dear {{candidateName}},</p>
            </div>

            <div class="main-content">
              <p>We are delighted to offer you the position of <strong>{{jobRole}}</strong> at {{companyName}}. This offer reflects our confidence in your professional capabilities and our commitment to your career growth.</p>

              <div class="compensation-professional">
                <h3><span>Compensation Package</span></h3>
                <div class="salary-highlight-pro">
                  <div class="total-package">
                    <span class="package-label"><span>Annual Package</span></span>
                    <span class="package-amount"><span>{{totalSalary}}</span></span>
                  </div>
                </div>

                <table class="salary-table-professional">
                  <thead>
                    <tr>
                      <th><span>Component</span></th>
                      <th><span>Monthly (₹)</span></th>
                      <th><span>Annual (₹)</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Basic Salary</span></td>
                      <td class="amount-pro"><span>{{basicMonthly}}</span></td>
                      <td class="amount-pro"><span>{{basicSalary}}</span></td>
                    </tr>
                    <tr>
                      <td><span>HRA</span></td>
                      <td class="amount-pro"><span>{{hraMonthly}}</span></td>
                      <td class="amount-pro"><span>{{hra}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Conveyance Allowance</span></td>
                      <td class="amount-pro"><span>{{conveyanceMonthly}}</span></td>
                      <td class="amount-pro"><span>{{conveyance}}</span></td>
                    </tr>
                    <tr>
                      <td><span>LTA</span></td>
                      <td class="amount-pro"><span>{{lta}}</span></td>
                      <td class="amount-pro"><span>{{lta}}</span></td>
                    </tr>
                    <tr class="total-professional">
                      <td><strong>Total</strong></td>
                      <td class="amount-pro"><strong>{{totalMonthly}}</strong></td>
                      <td class="amount-pro"><strong>{{totalSalary}}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="terms-professional">
                <h3>Employment Terms</h3>
                <div class="terms-container">
                  <div class="term-professional">
                    <span class="term-label-pro">Position:</span>
                    <span class="term-value-pro">{{jobRole}}</span>
                  </div>
                  <div class="term-professional">
                    <span class="term-label-pro">Reporting To:</span>
                    <span class="term-value-pro">{{reportingManager}}</span>
                  </div>
                  <div class="term-professional">
                    <span class="term-label-pro">Location:</span>
                    <span class="term-value-pro">{{workLocation}}</span>
                  </div>
                  <div class="term-professional">
                    <span class="term-label-pro">Joining Date:</span>
                    <span class="term-value-pro">{{joiningDate}}</span>
                  </div>
                  <div class="term-professional">
                    <span class="term-label-pro">Probation:</span>
                    <span class="term-value-pro">6 months</span>
                  </div>
                </div>
              </div>

              <p>This offer is contingent upon successful completion of background verification and medical examination. Please confirm your acceptance by {{offerExpiryDate}}.</p>

              <p>We look forward to welcoming you to our professional team and contributing to our mutual success.</p>
            </div>

            <div class="signature-professional">
              <p>Best regards,</p>
              <div class="signature-details">
                <p class="hr-name">{{hrName}}</p>
                <p class="hr-position">{{hrPosition}}</p>
                <p class="company-signature">{{companyName}}</p>
                <p class="hr-contact">Human Resources</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Calibri', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #1e293b;
            max-width: 750px;
            margin: 0 auto;
            padding: 45px;
            background: white;
            border: 1px solid #e2e8f0;
          }

          .header-professional {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 3px solid #1e40af;
          }

          .company-name-pro {
            font-size: 26pt;
            color: #1e40af;
            margin: 0 0 8px 0;
            font-weight: bold;
            letter-spacing: 0.5px;
          }

          .company-tagline {
            color: #64748b;
            font-style: italic;
            margin: 0 0 8px 0;
            font-size: 10pt;
          }

          .company-address {
            color: #64748b;
            font-size: 9pt;
            line-height: 1.4;
          }

          .letter-info {
            text-align: right;
          }

          .letter-date {
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 5px 0;
          }

          .letter-ref {
            color: #64748b;
            font-size: 9pt;
            margin: 0;
          }

          .candidate-section {
            margin: 30px 0;
            line-height: 1.8;
          }

          .candidate-name {
            font-weight: bold;
            font-size: 12pt;
            color: #1e293b;
            margin-bottom: 5px;
          }

          .candidate-address-full {
            color: #64748b;
          }

          .subject-professional {
            background: linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%);
            padding: 15px 20px;
            margin: 25px 0;
            border-left: 4px solid #1e40af;
            font-weight: bold;
            color: #1e40af;
          }

          .greeting-professional {
            margin: 25px 0;
            font-weight: 500;
            color: #1e293b;
          }

          .main-content p {
            margin-bottom: 15px;
            text-align: justify;
            color: #374151;
          }

          .compensation-professional {
            margin: 30px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 25px;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
          }

          .compensation-professional h3 {
            color: #1e40af;
            font-size: 14pt;
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #1e40af;
            text-align: center;
          }

          .salary-highlight-pro {
            text-align: center;
            margin-bottom: 25px;
          }

          .total-package {
            display: inline-block;
            background: white;
            padding: 20px 35px;
            border-radius: 8px;
            border: 2px solid #1e40af;
            box-shadow: 0 2px 8px rgba(30, 64, 175, 0.1);
          }

          .package-label {
            display: block;
            font-size: 10pt;
            color: #64748b;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .package-amount {
            font-size: 20pt;
            font-weight: bold;
            color: #1e40af;
            font-family: 'Courier New', monospace;
          }

          .salary-table-professional {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }

          .salary-table-professional th {
            background: #1e40af;
            color: white;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #1e293b;
          }

          .salary-table-professional td {
            padding: 12px 15px;
            border: 1px solid #cbd5e1;
            background: white;
          }

          .amount-pro {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
            color: #1e293b;
          }

          .total-professional {
            background: #eff6ff;
            font-weight: bold;
          }

          .total-professional td {
            border-top: 2px solid #1e40af;
          }

          .terms-professional {
            margin: 30px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 25px;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
          }

          .terms-professional h3 {
            color: #1e40af;
            font-size: 14pt;
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #1e40af;
            text-align: center;
          }

          .terms-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
          }

          .term-professional {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .term-professional:last-child {
            border-bottom: none;
          }

          .term-label-pro {
            font-weight: 600;
            color: #475569;
            flex: 0 0 140px;
          }

          .term-value-pro {
            color: #1e293b;
            text-align: right;
            flex: 1;
          }

          .signature-professional {
            margin-top: 45px;
            text-align: left;
          }

          .signature-details {
            margin-top: 30px;
          }

          .hr-name {
            font-weight: bold;
            font-size: 13pt;
            color: #1e293b;
            margin-bottom: 5px;
          }

          .hr-position,
          .company-signature,
          .hr-contact {
            margin: 3px 0;
            color: #64748b;
            font-size: 10pt;
          }
        `
      },
      {
        id: 6,
        name: 'Executive Suite',
        description: 'Premium template designed for C-level and senior executive positions',
        icon: '🏆',
        thumbnailBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        tags: ['Executive', 'Premium', 'C-Level'],
        previewHtml: `
          <div class="offer-letter">
            <div class="executive-header">
              <div class="premium-letterhead">
                <div class="company-premium">
                  <h1 class="premium-company-name">{{companyName}}</h1>
                  <p class="premium-tagline">{{companyTagline}}</p>
                </div>
                <div class="executive-meta">
                  <p class="executive-date">{{currentDate}}</p>
                  <p class="executive-classification">EXECUTIVE EMPLOYMENT AGREEMENT</p>
                </div>
              </div>
              <div class="premium-divider"></div>
            </div>

            <div class="executive-addressing">
              <p class="executive-recipient">{{candidateName}}</p>
              <p class="executive-address">{{candidateAddress}}</p>
            </div>

            <div class="executive-subject">
              <p><strong>EXECUTIVE EMPLOYMENT OFFER</strong></p>
              <p><strong>Position: {{jobRole}}</strong></p>
            </div>

            <div class="executive-greeting">
              <p>Dear {{candidateName}},</p>
            </div>

            <div class="executive-content">
              <p>On behalf of {{companyName}}, I am pleased to extend this executive employment offer for the position of <strong>{{jobRole}}</strong>. This appointment represents a significant opportunity for both professional growth and organizational impact.</p>

              <div class="executive-compensation">
                <h3>EXECUTIVE COMPENSATION PACKAGE</h3>
                <div class="premium-ctc">
                  <div class="ctc-display">
                    <span class="ctc-title">Total Annual Compensation</span>
                    <span class="ctc-figure">{{totalSalary}}</span>
                  </div>
                </div>

                <table class="executive-salary-table">
                  <thead>
                    <tr>
                      <th><span>Compensation Component</span></th>
                      <th><span>Monthly Amount</span></th>
                      <th><span>Annual Amount</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Base Salary</span></td>
                      <td class="exec-amount"><span>{{basicMonthly}}</span></td>
                      <td class="exec-amount"><span>{{basicSalary}}</span></td>
                    </tr>
                    <tr>
                      <td><span>HRA</span></td>
                      <td class="exec-amount"><span>{{hraMonthly}}</span></td>
                      <td class="exec-amount"><span>{{hra}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Conveyance Allowance</span></td>
                      <td class="exec-amount"><span>{{conveyanceMonthly}}</span></td>
                      <td class="exec-amount"><span>{{conveyance}}</span></td>
                    </tr>
                    <tr>
                      <td><span>LTA</span></td>
                      <td class="exec-amount"><span>{{lta}}</span></td>
                      <td class="exec-amount"><span>{{lta}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Medical Benefits</span></td>
                      <td class="exec-amount"><span>{{medical}}</span></td>
                      <td class="exec-amount"><span>{{medical}}</span></td>
                    </tr>
                    <tr class="executive-total">
                      <td><strong>TOTAL COMPENSATION</strong></td>
                      <td class="exec-amount"><strong>{{totalMonthly}}</strong></td>
                      <td class="exec-amount"><strong>{{totalSalary}}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="executive-benefits">
                <h3>EXECUTIVE BENEFITS & PERQUISITES</h3>
                <div class="benefits-grid">
                  <div class="benefit-item">
                    <span class="benefit-icon">🏥</span>
                    <span class="benefit-text">Comprehensive Health Coverage</span>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">🚗</span>
                    <span class="benefit-text">Company Vehicle</span>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">📱</span>
                    <span class="benefit-text">Mobile & Internet Allowance</span>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">🎓</span>
                    <span class="benefit-text">Professional Development</span>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">🏖️</span>
                    <span class="benefit-text">Executive Leave Policy</span>
                  </div>
                  <div class="benefit-item">
                    <span class="benefit-icon">💼</span>
                    <span class="benefit-text">Stock Options</span>
                  </div>
                </div>
              </div>

              <div class="executive-terms">
                <h3>EXECUTIVE EMPLOYMENT TERMS</h3>
                <div class="terms-executive">
                  <div class="exec-term">
                    <span class="exec-term-label">Reporting Relationship:</span>
                    <span class="exec-term-value">{{reportingManager}}</span>
                  </div>
                  <div class="exec-term">
                    <span class="exec-term-label">Work Location:</span>
                    <span class="exec-term-value">{{workLocation}}</span>
                  </div>
                  <div class="exec-term">
                    <span class="exec-term-label">Commencement Date:</span>
                    <span class="exec-term-value">{{joiningDate}}</span>
                  </div>
                  <div class="exec-term">
                    <span class="exec-term-label">Contract Term:</span>
                    <span class="exec-term-value">3 years (renewable)</span>
                  </div>
                  <div class="exec-term">
                    <span class="exec-term-label">Notice Period:</span>
                    <span class="exec-term-value">90 days</span>
                  </div>
                  <div class="exec-term">
                    <span class="exec-term-label">Performance Reviews:</span>
                    <span class="exec-term-value">Bi-annual</span>
                  </div>
                </div>
              </div>

              <p>This executive offer is extended based on your exceptional qualifications and our confidence in your leadership capabilities. The offer is subject to satisfactory background verification and reference checks.</p>

              <p>Please indicate your acceptance by <span>{{offerExpiryDate}}</span>. We look forward to your leadership contributions to <span>{{companyName}}</span>.</p>
            </div>

            <div class="executive-closing">
              <p>Yours sincerely,</p>
              <div class="executive-signature">
                <div class="signature-space">_______________________________</div>
                <p class="exec-signatory">{{hrName}}</p>
                <p class="exec-title">{{hrPosition}}</p>
                <p class="exec-company">{{companyName}}</p>
                <p class="exec-department">Executive Human Resources</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Garamond', serif;
            font-size: 12pt;
            line-height: 1.7;
            color: #0f172a;
            max-width: 850px;
            margin: 0 auto;
            padding: 50px;
            background: white;
            border: 2px solid #0f172a;
            position: relative;
          }

          .executive-header {
            margin-bottom: 40px;
          }

          .premium-letterhead {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .company-premium h1 {
            font-size: 32pt;
            font-weight: bold;
            color: #0f172a;
            margin: 0 0 10px 0;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .premium-tagline {
            color: #475569;
            font-style: italic;
            margin: 0;
            font-size: 11pt;
          }

          .executive-meta {
            text-align: right;
          }

          .executive-date {
            font-weight: bold;
            color: #0f172a;
            margin: 0 0 10px 0;
            font-size: 11pt;
          }

          .executive-classification {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 9pt;
            font-weight: bold;
            letter-spacing: 1px;
          }

          .premium-divider {
            height: 3px;
            background: linear-gradient(90deg, #0f172a 0%, #64748b 50%, #0f172a 100%);
            margin-top: 20px;
          }

          .executive-addressing {
            margin: 35px 0;
            line-height: 1.8;
          }

          .executive-recipient {
            font-weight: bold;
            font-size: 14pt;
            color: #0f172a;
            margin-bottom: 8px;
          }

          .executive-address {
            color: #64748b;
            font-size: 11pt;
          }

          .executive-subject {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 20px 25px;
            margin: 30px 0;
            border-left: 5px solid #0f172a;
            border-radius: 0 8px 8px 0;
          }

          .executive-subject p {
            margin: 0;
            font-weight: bold;
            color: #0f172a;
            font-size: 13pt;
          }

          .executive-greeting {
            margin: 30px 0;
            font-weight: 500;
            font-size: 13pt;
            color: #0f172a;
          }

          .executive-content p {
            margin-bottom: 18px;
            text-align: justify;
            color: #374151;
          }

          .executive-compensation {
            margin: 40px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 35px;
            border-radius: 10px;
            border: 2px solid #cbd5e1;
            position: relative;
          }

          .executive-compensation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #0f172a 0%, #64748b 100%);
          }

          .executive-compensation h3 {
            color: #0f172a;
            font-size: 16pt;
            margin: 0 0 30px 0;
            padding-bottom: 15px;
            border-bottom: 3px solid #0f172a;
            text-align: center;
            letter-spacing: 1px;
            font-weight: bold;
          }

          .premium-ctc {
            text-align: center;
            margin-bottom: 35px;
          }

          .ctc-display {
            display: inline-block;
            background: white;
            padding: 30px 50px;
            border-radius: 10px;
            border: 3px solid #0f172a;
            box-shadow: 0 8px 16px rgba(15, 23, 42, 0.15);
          }

          .ctc-title {
            display: block;
            font-size: 12pt;
            color: #64748b;
            margin-bottom: 12px;
            font-weight: 500;
          }

          .ctc-figure {
            font-size: 28pt;
            font-weight: bold;
            color: #0f172a;
            font-family: 'Courier New', monospace;
          }

          .executive-salary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
            border: 2px solid #0f172a;
          }

          .executive-salary-table th {
            background: #0f172a;
            color: white;
            padding: 16px 12px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #1e293b;
            font-size: 11pt;
          }

          .executive-salary-table td {
            padding: 16px 12px;
            border: 1px solid #cbd5e1;
            background: white;
            font-size: 11pt;
          }

          .exec-amount {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
            color: #0f172a;
          }

          .executive-total {
            background: #edf2f7;
            font-weight: bold;
            font-size: 12pt;
          }

          .executive-total td {
            border-top: 3px solid #0f172a;
            padding: 20px 12px;
          }

          .executive-benefits {
            margin: 40px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 35px;
            border-radius: 10px;
            border: 2px solid #cbd5e1;
          }

          .executive-benefits h3 {
            color: #0f172a;
            font-size: 16pt;
            margin: 0 0 30px 0;
            padding-bottom: 15px;
            border-bottom: 3px solid #0f172a;
            text-align: center;
            letter-spacing: 1px;
            font-weight: bold;
          }

          .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }

          .benefit-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease;
          }

          .benefit-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }

          .benefit-icon {
            font-size: 24pt;
          }

          .benefit-text {
            font-weight: 500;
            color: #374151;
          }

          .executive-terms {
            margin: 40px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 35px;
            border-radius: 10px;
            border: 2px solid #cbd5e1;
          }

          .executive-terms h3 {
            color: #0f172a;
            font-size: 16pt;
            margin: 0 0 30px 0;
            padding-bottom: 15px;
            border-bottom: 3px solid #0f172a;
            text-align: center;
            letter-spacing: 1px;
            font-weight: bold;
          }

          .terms-executive {
            display: grid;
            gap: 15px;
          }

          .exec-term {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .exec-term:last-child {
            border-bottom: none;
          }

          .exec-term-label {
            font-weight: bold;
            color: #475569;
            flex: 0 0 180px;
          }

          .exec-term-value {
            color: #0f172a;
            text-align: right;
            flex: 1;
            font-weight: 500;
          }

          .executive-closing {
            margin-top: 60px;
            text-align: left;
          }

          .executive-signature {
            margin-top: 40px;
          }

          .signature-space {
            width: 280px;
            height: 50px;
            border-bottom: 2px solid #0f172a;
            margin-bottom: 20px;
          }

          .exec-signatory {
            font-weight: bold;
            font-size: 14pt;
            color: #0f172a;
            margin-bottom: 8px;
          }

          .exec-title,
          .exec-company,
          .exec-department {
            margin: 4px 0;
            color: #64748b;
            font-size: 11pt;
          }
        `
      },
      {
        id: 7,
        name: 'Professional Gray',
        description: 'Sophisticated gray-scale template perfect for professional services',
        icon: '⚖️',
        thumbnailBg: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)',
        tags: ['Professional', 'Gray', 'Services'],
        previewHtml: `
          <div class="offer-letter">
            <div class="professional-header">
              <div class="company-professional">
                <h1 class="company-name-gray">{{companyName}}</h1>
                <p class="company-tagline-gray">{{companyTagline}}</p>
              </div>
              <div class="letter-details">
                <p class="letter-date-gray">{{currentDate}}</p>
                <p class="letter-reference">Ref: {{candidateId}}/{{year}}</p>
              </div>
            </div>

            <div class="candidate-professional">
              <p class="candidate-full-name">{{candidateName}}</p>
              <p class="candidate-full-address">{{candidateAddress}}</p>
            </div>

            <div class="subject-professional-gray">
              <strong>Subject: Employment Offer</strong>
            </div>

            <div class="greeting-professional-gray">
              <p>Dear {{candidateName}},</p>
            </div>

            <div class="content-professional">
              <p>{{companyName}} is pleased to offer you employment in the position of <strong>{{jobRole}}</strong>. We believe your expertise will contribute significantly to our continued success and growth.</p>

              <div class="compensation-professional-gray">
                <h3>Compensation Structure</h3>
                <div class="salary-focus">
                  <div class="annual-package">
                    <span class="package-title">Annual Compensation Package</span>
                    <span class="package-figure">{{totalSalary}}</span>
                  </div>
                </div>

                <table class="salary-table-gray">
                  <thead>
                    <tr>
                      <th><span>Salary Component</span></th>
                      <th><span>Monthly Amount</span></th>
                      <th><span>Annual Amount</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Basic Salary</span></td>
                      <td class="amount-gray"><span>{{basicMonthly}}</span></td>
                      <td class="amount-gray"><span>{{basicSalary}}</span></td>
                    </tr>
                    <tr>
                      <td><span>HRA</span></td>
                      <td class="amount-gray"><span>{{hraMonthly}}</span></td>
                      <td class="amount-gray"><span>{{hra}}</span></td>
                    </tr>
                    <tr>
                      <td><span>Conveyance</span></td>
                      <td class="amount-gray"><span>{{conveyanceMonthly}}</span></td>
                      <td class="amount-gray"><span>{{conveyance}}</span></td>
                    </tr>
                    <tr>
                      <td><span>LTA</span></td>
                      <td class="amount-gray"><span>{{lta}}</span></td>
                      <td class="amount-gray"><span>{{lta}}</span></td>
                    </tr>
                    <tr class="total-gray">
                      <td><strong>Total Package</strong></td>
                      <td class="amount-gray"><strong>{{totalMonthly}}</strong></td>
                      <td class="amount-gray"><strong>{{totalSalary}}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="terms-professional-gray">
                <h3>Employment Terms & Conditions</h3>
                <div class="terms-professional-list">
                  <div class="term-professional-item">
                    <span class="term-professional-label">Position Title:</span>
                    <span class="term-professional-value">{{jobRole}}</span>
                  </div>
                  <div class="term-professional-item">
                    <span class="term-professional-label">Reports To:</span>
                    <span class="term-professional-value">{{reportingManager}}</span>
                  </div>
                  <div class="term-professional-item">
                    <span class="term-professional-label">Work Location:</span>
                    <span class="term-professional-value">{{workLocation}}</span>
                  </div>
                  <div class="term-professional-item">
                    <span class="term-professional-label">Joining Date:</span>
                    <span class="term-professional-value">{{joiningDate}}</span>
                  </div>
                  <div class="term-professional-item">
                    <span class="term-professional-label">Probation Period:</span>
                    <span class="term-professional-value">6 months</span>
                  </div>
                  <div class="term-professional-item">
                    <span class="term-professional-label">Notice Period:</span>
                    <span class="term-professional-value">30 days</span>
                  </div>
                </div>
              </div>

              <p>This offer is subject to satisfactory reference checks and medical examination. Please confirm your acceptance by signing and returning this letter by {{offerExpiryDate}}.</p>

              <p>We look forward to your professional contributions and welcome you to the {{companyName}} team.</p>
            </div>

            <div class="signature-professional-gray">
              <p>Best regards,</p>
              <div class="signature-professional-details">
                <p class="hr-signature-name">{{hrName}}</p>
                <p class="hr-signature-position">{{hrPosition}}</p>
                <p class="hr-signature-company">{{companyName}}</p>
                <p class="hr-signature-dept">Human Resources Department</p>
              </div>
            </div>
          </div>
        `,
        css: `
          .offer-letter {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #1f2937;
            max-width: 800px;
            margin: 0 auto;
            padding: 50px;
            background: white;
            border: 1px solid #d1d5db;
          }

          .professional-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-bottom: 25px;
            border-bottom: 3px solid #374151;
          }

          .company-professional h1 {
            font-size: 28pt;
            color: #374151;
            margin: 0 0 8px 0;
            font-weight: bold;
            letter-spacing: 1px;
          }

          .company-tagline-gray {
            color: #6b7280;
            font-style: italic;
            margin: 0;
            font-size: 11pt;
          }

          .letter-details {
            text-align: right;
          }

          .letter-date-gray {
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 5px 0;
          }

          .letter-reference {
            color: #6b7280;
            font-size: 10pt;
            margin: 0;
          }

          .candidate-professional {
            margin: 35px 0;
            line-height: 1.8;
          }

          .candidate-full-name {
            font-weight: bold;
            font-size: 13pt;
            color: #1f2937;
            margin-bottom: 5px;
          }

          .candidate-full-address {
            color: #6b7280;
          }

          .subject-professional-gray {
            background: #f9fafb;
            padding: 18px 22px;
            margin: 28px 0;
            border-left: 4px solid #374151;
            font-weight: bold;
            color: #374151;
          }

          .greeting-professional-gray {
            margin: 28px 0;
            font-weight: 500;
            color: #1f2937;
          }

          .content-professional p {
            margin-bottom: 16px;
            text-align: justify;
            color: #374151;
          }

          .compensation-professional-gray {
            margin: 35px 0;
            background: #f9fafb;
            padding: 30px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
          }

          .compensation-professional-gray h3 {
            color: #374151;
            font-size: 15pt;
            margin: 0 0 25px 0;
            padding-bottom: 12px;
            border-bottom: 2px solid #374151;
            text-align: center;
          }

          .salary-focus {
            text-align: center;
            margin-bottom: 30px;
          }

          .annual-package {
            display: inline-block;
            background: white;
            padding: 25px 40px;
            border-radius: 8px;
            border: 2px solid #374151;
            box-shadow: 0 2px 8px rgba(55, 65, 81, 0.1);
          }

          .package-title {
            display: block;
            font-size: 11pt;
            color: #6b7280;
            margin-bottom: 10px;
            font-weight: 500;
          }

          .package-figure {
            font-size: 22pt;
            font-weight: bold;
            color: #374151;
            font-family: 'Courier New', monospace;
          }

          .salary-table-gray {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .salary-table-gray th {
            background: #374151;
            color: white;
            padding: 14px 16px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #4b5563;
          }

          .salary-table-gray td {
            padding: 14px 16px;
            border: 1px solid #d1d5db;
            background: white;
          }

          .amount-gray {
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: 500;
            color: #1f2937;
          }

          .total-gray {
            background: #f3f4f6;
            font-weight: bold;
          }

          .total-gray td {
            border-top: 2px solid #374151;
          }

          .terms-professional-gray {
            margin: 35px 0;
            background: #f9fafb;
            padding: 30px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
          }

          .terms-professional-gray h3 {
            color: #374151;
            font-size: 15pt;
            margin: 0 0 25px 0;
            padding-bottom: 12px;
            border-bottom: 2px solid #374151;
            text-align: center;
          }

          .terms-professional-list {
            display: grid;
            gap: 14px;
          }

          .term-professional-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
          }

          .term-professional-item:last-child {
            border-bottom: none;
          }

          .term-professional-label {
            font-weight: 600;
            color: #4b5563;
            flex: 0 0 160px;
          }

          .term-professional-value {
            color: #1f2937;
            text-align: right;
            flex: 1;
          }

          .signature-professional-gray {
            margin-top: 50px;
            text-align: left;
          }

          .signature-professional-details {
            margin-top: 35px;
          }

          .hr-signature-name {
            font-weight: bold;
            font-size: 14pt;
            color: #1f2937;
            margin-bottom: 6px;
          }

          .hr-signature-position,
          .hr-signature-company,
          .hr-signature-dept {
            margin: 4px 0;
            color: #6b7280;
            font-size: 11pt;
          }
        `
      }
    ];

    for (const template of defaultTemplates) {
      const existing = await this.templateRepository.findOne({ where: { id: template.id } });
      if (existing) {
        // Update existing template
        await this.templateRepository.update(existing.id, {
          ...template,
          updatedAt: new Date(),
        });
        console.log(`Updated template: ${template.name}`);
      } else {
        // Create new template
        await this.create(template);
        console.log(`Created template: ${template.name}`);
      }
    }
  }
}
