import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Template {
  id: number;
  name: string;
  description: string;
  icon: string;
  thumbnailBg: string;
  tags: string[];
  previewHtml: string;
  css: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(private apiService: ApiService) {}

  // Get all templates
  getTemplates(): Observable<Template[]> {
    return this.apiService.get<Template[]>('/templates');
  }

  // Save template
  saveTemplate(templateData: { html: string; css: string; name: string }): Observable<Template> {
    return this.apiService.post<Template>('/templates/save', templateData);
  }

  // Create template
  createTemplate(template: Partial<Template>): Observable<Template> {
    return this.apiService.post<Template>('/templates', template);
  }
}
