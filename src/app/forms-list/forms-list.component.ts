import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormDescription} from '../model';
import {FormsService} from '../forms.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forms-list',
  template: `
    <div class="ui basic segment">
      
      <ng-container *ngIf="forms && forms.length; else welcome">
        <h2 class="ui header">Choose the form to edit</h2>
        
        <div class="ui segment">
          <div class="ui middle aligned divided list">
            <div class="item" *ngFor="let form of forms">
              <i class="large comments middle aligned green icon"></i>
              <div class="content">
                <a class="header" (click)="view(form.id)">{{form.title}}</a>
                <div class="description">{{form.description}}</div>
              </div>
              <div class="right floated content">
                <button class="ui circular green icon mini button" (click)="view(form.id)"><i class="inverted eye icon"></i></button>
                <button class="ui circular blue icon mini button" (click)="edit(form.id)"><i class="inverted edit icon"></i></button>
                <button class="ui circular red icon mini button" (click)="delete(form.id)"><i class="inverted trash icon"></i></button>
              </div>
            </div>
          </div>
        </div>
                
        <button class="ui primary button" (click)="addNew()">Add new form</button>
      </ng-container>
      
      <ng-template #welcome>
        <div class="ui center aligned basic segment">
          <button class="ui blue labeled icon button" (click)="addNew()"><i class="add icon"></i> Start by creating a new form</button>
        </div>
      </ng-template>
    
    </div>
  `,
  styles: []
})
export class FormsListComponent implements OnInit {

  @Input("forms")
  public forms: FormDescription[];

  public addNew(): void {
    let form = this.formsService.addForm();
    this.router.navigateByUrl( "form/" + form.id);
  }

  public edit(id: number) {
    this.router.navigateByUrl("form/"+id);
  }

  public delete(id: number) {
    this.formsService.deleteForm(id)
  }

  public view(id:number) {
    this.router.navigateByUrl("form/"+id + "/preview");
  }

  constructor(private formsService: FormsService, private router: Router) { }

  ngOnInit() {
    this.formsService.forms$.forEach( forms => this.forms = forms )
  }

}
