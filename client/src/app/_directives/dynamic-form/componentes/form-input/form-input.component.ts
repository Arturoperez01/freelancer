import { Component, ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';


@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div 
      class="md-form" 
      [formGroup]="group">
      <label class="float-left">{{ config.label }}</label>
      <input
        mdbInput
        mdbValidate 
        type="text" 
        class="form-control"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name" />          
      <mat-error *ngIf="validate.invalid && (validate.dirty || validate.touched)">Input invalid</mat-error>
    </div>
  `,
})
export class FormInputComponent implements Field  {
  config: FieldConfig;
  group: FormGroup;
  
  get validate() { return this.group.get(this.config.name); }
}