import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-page',
  template: `
    <div class="ui two column grid">
      <div class="row">
        <div class="column">
            <app-fields-editor></app-fields-editor>
        </div>
        <div class="column">
            <app-fields-preview></app-fields-preview>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class FormPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
