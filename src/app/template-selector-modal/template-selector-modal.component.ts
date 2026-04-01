import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Template } from '../../services/template.service';

export interface TemplateOption {
  id: number;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
}

@Component({
  selector: 'app-template-selector-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-selector-modal.component.html',
  styleUrls: ['./template-selector-modal.component.css']
})
export class TemplateSelectorModalComponent {
  @Input() isVisible = false;
  @Input() templates: Template[] = [];
  @Input() selectedTemplate: Template | null = null;

  @Output() templateSelected = new EventEmitter<Template>();
  @Output() templateApplied = new EventEmitter<Template>();
  @Output() modalClosed = new EventEmitter<void>();

  onTemplateClick(template: Template): void {
    this.selectedTemplate = template;  // Update local selected template
    this.templateSelected.emit(template);
  }

  onApplyTemplate(): void {
    console.log('onApplyTemplate called, selectedTemplate:', this.selectedTemplate);
    if (this.selectedTemplate) {
      console.log('Emitting templateApplied event with:', this.selectedTemplate);
      this.templateApplied.emit(this.selectedTemplate);
      console.log('templateApplied event emitted');
    } else {
      console.warn('No template selected, cannot apply');
    }
  }

  onCloseModal(): void {
    this.modalClosed.emit();
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCloseModal();
    }
  }

  // Helper method to get thumbnail emoji based on template properties
  getThumbnailEmoji(template: Template): string {
    if (template.icon) {
      return template.icon;
    }
    // Default thumbnails based on template name or tags
    if (template.name.toLowerCase().includes('classic') || template.name.toLowerCase().includes('corporate')) {
      return '🏢';
    }
    if (template.name.toLowerCase().includes('modern') || template.name.toLowerCase().includes('minimal')) {
      return '✨';
    }
    return '📄'; // Default document icon
  }

  // Helper method to get category from tags
  getCategory(template: Template): string {
    if (template.tags && template.tags.length > 0) {
      return template.tags[0];
    }
    return 'General';
  }
}