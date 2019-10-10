import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-button',
  styleUrls: ['form-button.component.scss'],
  template: `
   <div 
      class="dynamic-field form-button"
      [formGroup]="group">
      <button
      mdbBtn 
      color="primary"
      [disabled]="config.disabled"
      type="submit"
      mdbWavesEffect>
        {{ config.label }}
      </button>
    </div>
  `,
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}