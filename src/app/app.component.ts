import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="ui container site-header inverted blue segment">
        <h2 class="ui header"><i class="big newspaper outline icon"></i>
          <div class="content"> Form builder
            <div class="sub header">Arrange a form for your customers</div>
          </div>
        </h2>
    </div>
    <div class="ui container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
