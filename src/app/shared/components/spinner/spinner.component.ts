import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() type: 'border' | 'dots' | 'pulse' | 'bars' = 'border';
  @Input() overlay: boolean = false;
  @Input() text: string = '';
  @Input() fullScreen: boolean = false;

  get spinnerSizeClass(): string {
    const sizeClasses = {
      'sm': 'spinner-sm',
      'md': 'spinner-md',
      'lg': 'spinner-lg',
      'xl': 'spinner-xl'
    };
    return sizeClasses[this.size];
  }

  get spinnerColorClass(): string {
    return `spinner-${this.color}`;
  }

  get spinnerTypeClass(): string {
    return `spinner-${this.type}`;
  }
}