import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {InputField, InputType} from '../../model';
import {LineInputComponent} from './line-input/line-input.component';
import {TextInputComponent} from './text-input/text-input.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {FileComponent} from './file/file.component';
import {SingleOptionComponent} from './single-option/single-option.component';

const types = {
  line: LineInputComponent,
  text: TextInputComponent,
  radio: RadioGroupComponent,
  checkbox: CheckboxGroupComponent,
  file: FileComponent,
  select: SingleOptionComponent
};

@Directive({
  selector: '[appTypedField]'
})
export class TypedFieldDirective implements OnInit {

  @Input("appTypedField")
  public field: InputField;

  input;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) { }

  ngOnInit(): void {
    const componentType = types[this.field.type];
    const componentFactory = this.resolver.resolveComponentFactory<any>(componentType);
    this.input = this.container.createComponent(componentFactory);
    this.input.instance.field = this.field;
  }

}
