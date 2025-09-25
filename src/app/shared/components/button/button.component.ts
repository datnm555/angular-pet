import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() outline: boolean = false;
  @Input() rounded: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Output() btnClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.btnClick.emit(event);
    }
  }

  get buttonClasses(): string[] {
    const classes = ['btn'];

    classes.push(`btn-${this.variant}`);
    classes.push(`btn-${this.size}`);

    if (this.outline) {
      classes.push('btn-outline');
    }

    if (this.fullWidth) {
      classes.push('btn-full-width');
    }

    if (this.rounded) {
      classes.push('btn-rounded');
    }

    if (this.loading) {
      classes.push('btn-loading');
    }

    return classes;
  }
}