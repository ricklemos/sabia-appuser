import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/cl-form/form.component';
import { CollactComponentsModule } from 'collact-components';



@NgModule({
  declarations: [
    FormComponent
  ],
  exports: [
    FormComponent
  ],
  imports: [
    CommonModule,
    CollactComponentsModule
  ]
})
export class FormsModule { }
