import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="ui checkbox">
      <input #checkbox type="checkbox" checked="" tabindex="0" class="hidden">
      <label (click)="checkbox.click()">{{label}}</label>
    </div>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {

  @Input()
  public label:string;

  constructor() { }

  ngOnInit() {
  }

}
