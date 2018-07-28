import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {InputField} from '../../../model';

@Component({
  selector: 'app-text-input',
  template: `
      <label>{{field.title}}</label>
      <textarea rows="4"></textarea>
  `,
  styles: [],
  host: {class: 'field as-block'}
})
export class TextInputComponent implements OnInit {

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
