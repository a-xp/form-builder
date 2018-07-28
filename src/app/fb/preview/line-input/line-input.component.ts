import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {InputField} from '../../../model';

@Component({
  selector: 'app-line-input',
  template: `
      <label>{{field.title}}</label>
      <input type="text"/>
  `,
  styles: [],
  host: {class: 'field as-block'}
})
export class LineInputComponent implements OnInit {

  @Input()
  public field: InputField;

  @HostBinding('class.required')
  get required(){
    return this.field.required
  }

  constructor() { }

  ngOnInit() {
  }

}
