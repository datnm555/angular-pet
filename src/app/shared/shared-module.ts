import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const SHARED_COMPONENTS = [
  InputComponent,
  TextareaComponent,
  ButtonComponent,
  ModalComponent,
  TableComponent,
  CardComponent,
  AlertComponent,
  SpinnerComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...SHARED_COMPONENTS
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
