import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {InputField} from '../../../model';

@Component({
  selector: 'app-radio-group',
  template: `
      <label>{{field.title}}</label>
      <div class="field" *ngFor="let option of field.options">
        <app-radio [label]="option" [name]="'field_'+index"></app-radio>
      </div>
  `,
  styles: [],
  host: {class: 'grouped fields as-block'}
})
export class RadioGroupComponent implements OnInit {

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
