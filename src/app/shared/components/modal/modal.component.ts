import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() showCloseButton: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() closeOnBackdrop: boolean = true;
  @Input() customHeader: TemplateRef<any> | null = null;
  @Input() customFooter: TemplateRef<any> | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  onModalContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  close(): void {
    this.closeModal.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  get modalSizeClass(): string {
    const sizeClasses = {
      'sm': 'modal-sm',
      'md': 'modal-md',
      'lg': 'modal-lg',
      'xl': 'modal-xl',
      'full': 'modal-full'
    };
    return sizeClasses[this.size];
  }
}