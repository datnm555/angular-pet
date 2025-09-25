import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() rows: number = 4;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() helpText: string = '';
  @Input() id: string = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  @Input() control: FormControl | null = null;
  @Input() resizable: boolean = true;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTextareaChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  get showError(): boolean {
    if (!this.control) return false;
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errors(): string[] {
    if (!this.control || !this.control.errors) return [];

    const errors: string[] = [];
    const errorObj = this.control.errors;

    if (errorObj['required']) errors.push('This field is required');
    if (errorObj['minlength']) errors.push(`Minimum length is ${errorObj['minlength'].requiredLength}`);
    if (errorObj['maxlength']) errors.push(`Maximum length is ${errorObj['maxlength'].requiredLength}`);

    return errors;
  }

  get characterCount(): string {
    if (!this.maxLength) return '';
    return `${this.value.length} / ${this.maxLength}`;
  }
}