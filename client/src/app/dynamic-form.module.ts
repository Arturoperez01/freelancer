import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { DynamicFormComponent } from './_directives/dynamic-form/dynamic-form.component';
import { FormButtonComponent, FormInputComponent, FormSelectComponent, FormPasswordComponent, FormTagsComponent, FormMultiComponent} from './_directives/dynamic-form/componentes';
import { DynamicFieldDirective } from './_directives/dynamic-form/componentes/dynamic-field/dynamic-field.directive';
@NgModule({
  imports:[
    CommonModule,
    ReactiveFormsModule, 
    WavesModule, 
    ButtonsModule, 
    MatSelectModule,
    MatFormFieldModule,
    InputsModule.forRoot()
  ],
  declarations: [ DynamicFieldDirective, DynamicFormComponent, FormButtonComponent, FormInputComponent, FormSelectComponent, FormPasswordComponent, FormTagsComponent,FormMultiComponent],
  exports: [DynamicFormComponent],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormPasswordComponent,
    FormTagsComponent,
    FormMultiComponent    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class DynamicFormModule {}