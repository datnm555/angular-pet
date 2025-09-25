import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dismissible: boolean = true;
  @Input() icon: boolean = true;
  @Input() animate: boolean = true;
  @Input() autoClose: boolean = false;
  @Input() autoCloseDelay: number = 5000;

  @Output() dismiss = new EventEmitter<void>();

  isVisible: boolean = true;
  private autoCloseTimer: any;

  ngOnInit(): void {
    if (this.autoClose) {
      this.startAutoCloseTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  onDismiss(): void {
    this.isVisible = false;
    this.dismiss.emit();
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  private startAutoCloseTimer(): void {
    this.autoCloseTimer = setTimeout(() => {
      this.onDismiss();
    }, this.autoCloseDelay);
  }

  get alertIcon(): string {
    const icons = {
      'success': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'error': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      'warning': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[this.type];
  }

  get alertClasses(): string[] {
    const classes = ['alert'];
    classes.push(`alert-${this.type}`);
    if (this.animate && this.isVisible) {
      classes.push('alert-animate');
    }
    return classes;
  }
}