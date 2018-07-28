import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h2>Page does not exist</h2>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
