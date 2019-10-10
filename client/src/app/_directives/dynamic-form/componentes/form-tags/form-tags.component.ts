import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Form } from '@angular/forms';

import { Field } from '../../models/field.interface';
//Todo: poder colocar multiples tags
@Component({
  selector: 'form-tags',
  styleUrls: ['form-tags.component.scss'],
  template: `
  <div class="row" [formGroup]="group">
      <div class="form-group col-md-12">
      <h3 class="text-left">{{this.config['name']}}</h3>
        <div class="row">
          <div class="col-md-10" >
                <input 
                mdbInput
                [attr.placeholder]="config.placeholder"
                 type="text" class="form-control mt-2" id="{{this.config['name']}}Tags" name="{{this.config['name']}}Tags" #newTags>
          </div>
          <div clas="col-md-2">
            <span class="round btn-sm primary-color float-right " (click)="addTags(newTags)">
                <i class="fa fa-plus"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-12">
      <label class="text-left" *ngIf="!tagsArray || tagsArray.length==0; else empty">
          No {{this.config['name']}} assigned
      </label>
    </div>

    <!-- NO tags -->
      <ng-template #empty>
        <div formArrayName="{{this.config['name']}}" class="col-md-12">
          
          <div *ngFor="let address of tagsArray.controls; let i=index" class="row" >
            <!-- The repeated alias template -->
            <div class="col-md-10 mt-2">
              tag:
              <input type="text" [formControlName]="i">
            <span class="round btn-sm danger-color float-right" (click)="removeRole(i)"><i class="fa fa-trash"></i></span>
            </div>
          </div>
        </div>
    </ng-template>
  </div>
  `,
})
export class FormTagsComponent implements Field {

  config;

  group: FormGroup;
  
  constructor(
    private fb: FormBuilder
    ){}
  
    get tagsArray(): FormArray {
      //console.log(this.group.get('preguntasPlantilla'));
      //console.log(this.config['name'],this.group.get(this.config['name']));
      return this.group.get(this.config['name']) as FormArray;
    }
    //*/
  
    addTags(tag){
      //this.group.get(this.config['name']).push(tag);
      console.log(tag);
      this.tagsArray.push(this.getTagFormGroup(tag.value));
      console.log(this.tagsArray);
    };
    
    getTagFormGroup(tag){
      return this.fb.control(tag);
      /*
      return this.fb.group({
        tag
      });
      //*/
    }
    //*/
    removeRole(index){
      this.tagsArray.removeAt(index);
    };

}