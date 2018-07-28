import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-radio',
  template: `
    <div class="ui radio checkbox">
      <input #radio type="radio" name="{{name}}" tabindex="0" class="hidden">
      <label (click)="radio.click()">{{label}}</label>
    </div>
  `,
  styles: []
})
export class RadioComponent implements OnInit {

  @Input()
  public name: string;
  @Input()
  public label: string;

  constructor() { }

  ngOnInit() {
  }

}
