import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <mat-form-field
      [formGroup]="group">
      <mat-label>{{ config.label }}</mat-label>
      <mat-select [formControlName]="config.name">
        <mat-option [value]="">{{ config.placeholder }}</mat-option>
        <mat-option *ngFor="let option of config.options" [value]="option.key">
          {{ option.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class FormSelectComponent implements Field {
  config;
  group: FormGroup;

}