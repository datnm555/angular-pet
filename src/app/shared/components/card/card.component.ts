import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() clickable: boolean = false;
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() borderRadius: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() customHeader: TemplateRef<any> | null = null;
  @Input() customFooter: TemplateRef<any> | null = null;
  @Input() headerActions: TemplateRef<any> | null = null;

  @Output() cardClick = new EventEmitter<void>();

  onCardClick(): void {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }

  get shadowClass(): string {
    const shadowClasses = {
      'none': '',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'lg': 'shadow-lg',
      'xl': 'shadow-xl'
    };
    return shadowClasses[this.shadow];
  }

  get paddingClass(): string {
    const paddingClasses = {
      'none': 'padding-none',
      'sm': 'padding-sm',
      'md': 'padding-md',
      'lg': 'padding-lg'
    };
    return paddingClasses[this.padding];
  }

  get borderRadiusClass(): string {
    const radiusClasses = {
      'none': 'radius-none',
      'sm': 'radius-sm',
      'md': 'radius-md',
      'lg': 'radius-lg'
    };
    return radiusClasses[this.borderRadius];
  }
}