import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../forms.service';
import {FormDescription} from '../../../model';

@Component({
  selector: 'app-fields-preview',
  template: `
    <div class="ui basic segment">
      <h2>Form preview</h2>
    </div>
    <div class="ui grid basic segment middle aligned center aligned">
      <div class="ui left aligned segment column" *ngIf="form" style="max-width: 550px; padding-top: 1em; padding-bottom: 1em">
        <h2 class="ui header">
          <i class="comments icon"></i>
          <div class="content">
            {{form.title}}
            <div class="sub header">{{form.description}}</div>
          </div>
        </h2>
        
        <div class="ui small form">
          <ng-container *ngFor="let field of form.fields">
            <ng-container [appTypedField]="field"></ng-container>
          </ng-container>
        </div>
        <div class="ui basic center aligned segment">
          <button class="ui big primary button" (click)="exit()">{{form.button}}</button>
        </div>
      </div>
    </div>
    <div class="ui basic right aligned segment">
      <button class="ui big icon button" (click)="exit()"><i class="home icon"></i> Return</button>
    </div>
  `,
  styles: []
})
export class FormPreviewComponent implements OnInit {

  public form: FormDescription;

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private formsService:FormsService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach( params => {
        this.form = this.formsService.getForm(params.id);
    })
  }

  public exit(){
    this.router.navigateByUrl("/form")
  }
}
