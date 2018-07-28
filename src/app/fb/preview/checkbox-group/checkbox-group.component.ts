import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {InputField} from '../../../model';

@Component({
  selector: 'app-checkbox-group',
  template: `
      <label>{{field.title}}</label>
      <div class="field" *ngFor="let option of field.options">
        <app-checkbox [label]="option"></app-checkbox>
      </div>
  `,
  styles: [],
  host: {class: 'grouped fields as-block'}
})
export class CheckboxGroupComponent implements OnInit {
  @Input()
  public index: number;
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
