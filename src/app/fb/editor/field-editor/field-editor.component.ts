import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputField, InputType} from '../../../model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-field-editor',
  template: `
    <div class="ui top attached inverted blue segment compacted">
      {{fieldType}}
      <a href="#" (click)="removeField()" class="ui float-right"><i class="ui inverted remove icon"></i></a>
    </div>
    <div class="ui attached segment mini form" [formGroup]="form">
      <div class="field" [ngClass]="{error: form.controls.title.invalid}">
        <label>Label</label>
        <input type="text" formControlName="title"/>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" formControlName="required" class="hidden" #required/>
          <label (click)="required.click($event)">Required</label>
        </div>
      </div>
      <div *ngIf="hasOptions(field.type)" formGroupName="options">
        <h5 class="ui dividing header">Options</h5>
        <div class="ui error message" *ngIf="form.controls.options.errors && form.controls.options.errors.noEntriesDefined">
          <div class="header">No options defined</div>
          <p>{{fieldType}} should have at least one option</p>
        </div>
        <div class="ui icon input fluid field" *ngFor="let option of field.options; let id = index" [ngClass]="{error: form.controls.options.controls[id] && form.controls.options.controls[id].invalid}">
          <input type="text" formControlName="{{id}}"/>
          <i class="red inverted circular trash link icon" (click)="removeOption(id)"></i>
        </div>
        <button class="ui labeled icon mini green button" (click)="addOption()" type="button">
          <i class="plus inverted icon"></i>
          Add option
        </button>
      </div>
    </div>
    <div class="ui bottom attached segment center aligned compacted">
      <a href="#" (click)="reorder('fb')"><i class="fast backward blue icon"></i></a>
      <a href="#" (click)="reorder('sb')"><i class="step backward blue icon"></i></a>
      <b class="ui blue label">{{index + 1}}</b>
      <a href="#" (click)="reorder('sf')"><i class="step forward blue icon"></i></a>
      <a href="#" (click)="reorder('ff')"><i class="fast forward blue icon"></i></a>
    </div>
  `,
  styles: []
})
export class FieldEditorComponent implements OnInit {

  @Input('field')
  public field: InputField;
  @Input('index')
  public index: number;
  @Input('form')
  public form: FormGroup;
  @Output('optionAdd')
  public optionAdd: EventEmitter<string> = new EventEmitter();
  @Output('optionRemove')
  public optionRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output('fieldRemove')
  public fieldRemove: EventEmitter<void> = new EventEmitter<void>();
  @Output('changeOrder')
  public changeOrder: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  public hasOptions(type: InputType): boolean {
    return [InputType.checkbox, InputType.radio, InputType.select].includes(type);
  }

  public addOption() {
    this.optionAdd.emit('new option');
  }

  public removeOption(id: number) {
    this.optionRemove.emit(id);
  }

  public removeField():boolean {
    this.fieldRemove.emit();
    return false;
  }

  public get fieldType() {
    return typeNames[this.field.type];
  }

  public reorder(dir: string) {
    this.changeOrder.emit(dir);
    return false
  }

}


const typeNames = {
  line: 'Single line text input',
  text: 'Multiline text input',
  select: 'Single option',
  radio: 'Radio buttons',
  checkbox: 'Checkboxes',
  file: 'File upload'
};
