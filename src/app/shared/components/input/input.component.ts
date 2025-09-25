import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() errorMessage: string = '';
  @Input() helpText: string = '';
  @Input() id: string = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() control: FormControl | null = null;

  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
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

  onInputChange(event: any): void {
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
    if (errorObj['email']) errors.push('Please enter a valid email address');
    if (errorObj['minlength']) errors.push(`Minimum length is ${errorObj['minlength'].requiredLength}`);
    if (errorObj['maxlength']) errors.push(`Maximum length is ${errorObj['maxlength'].requiredLength}`);
    if (errorObj['pattern']) errors.push('Please enter a valid value');

    return errors;
  }
}