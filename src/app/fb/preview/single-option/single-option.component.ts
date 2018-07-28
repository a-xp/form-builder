import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {InputField} from '../../../model';

@Component({
  selector: 'app-single-option',
  template: `
    <label>{{field.title}}</label>
    <div class="ui selection dropdown" (click)="toggle()" [ngClass]="{active: open, visible: open}">
      <i class="dropdown icon"></i>
      <div class="text" [ngClass]="{default: default}">{{text}}</div>
      <div class="menu" [ngClass]="{visible: open}" [ngStyle]="{'display': dropdownStyle}">
        <div class="item" *ngFor="let option of field.options" (click)="select(option)">{{option}}</div>
      </div>
    </div>
  `,
  styles: [],
  host: {class: 'field as-block'}
})
export class SingleOptionComponent implements OnInit {

  public open: boolean = false;
  public text: string;
  public default: boolean = true;

  @Input()
  public field: InputField;

  @HostBinding('class.required')
  get required(){
    return this.field.required
  }

  get dropdownStyle(){
    return this.open? 'block' : '';
  }

  public select(option:string){
    this.text = option;
    this.default = false;
  }

  public toggle(){
    this.open = !this.open;
  }

  constructor() { }

  ngOnInit() {
    this.text = this.field.title;
  }

}
