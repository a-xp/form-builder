import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {InputField} from '../../../model';

@Component({
  selector: 'app-file',
  template: `
      <label>{{field.title}}</label>
      <input type="file"/>
  `,
  styles: [],
  host: {class: 'field as-block'}
})
export class FileComponent implements OnInit {

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
