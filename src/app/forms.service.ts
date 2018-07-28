import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {FormDescription} from './model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

const LOCAL_STORAGE_KEY_FORMS = 'form-editor.forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private forms: FormDescription[] = [];
  private _forms$: BehaviorSubject<FormDescription[]> = new BehaviorSubject<FormDescription[]>([]);

  get forms$():Observable<FormDescription[]> {
    return this._forms$;
  }

  public addForm(): FormDescription {
    let form = {id: this.newId, title: "New form", button: "OK", description: "Investigating opinions of our customers", fields: []};
    let forms = this.forms.slice(0);
    forms.push(form);
    this.updateForms(forms);
    return form;
  }

  public updateForm(form:FormDescription): void {
    const forms = this.forms.slice(0);
    const index = this.forms.findIndex(i => i.id == form.id);
    forms[index] = form;
    this.updateForms(forms);
  }

  public setForms(forms:FormDescription[]): void {
    this.forms = forms;
    this._forms$.next(forms);
  }

  public getForm(id:number): FormDescription{
    return this.forms.find( form => form.id == id)
  }

  public deleteForm(id:number) {
    const forms = this.forms.slice(0);
    const index = this.forms.findIndex(i => i.id == id);
    forms.splice(index, 1);
    this.updateForms(forms)
  }

  private updateForms(forms: FormDescription[]){
    this.setForms(forms);
    localStorage.setItem(LOCAL_STORAGE_KEY_FORMS, JSON.stringify(this.forms))
  }

  constructor() {
    const forms = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FORMS));
    this.setForms( forms ? forms : [])
  }

  get newId(){
    return this.forms && this.forms.length ? Math.max.apply(Math, this.forms.map( i => i.id)) + 1 : 1
  }

}
