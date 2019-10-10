import { ComponentFactoryResolver, ComponentRef, Directive, OnChanges, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent, FormInputComponent, FormSelectComponent, FormPasswordComponent, FormTagsComponent, FormMultiComponent} from '../'

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

const components = {
    button: FormButtonComponent,
    input: FormInputComponent,
    select: FormSelectComponent,
    password: FormPasswordComponent,
    tags: FormTagsComponent,
    multiselect: FormMultiComponent
  };

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    //const component = components[this.config.type];
    const factory = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(factory);
    
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}