import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormDescription, InputField, InputType} from '../../../model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import {FormsService} from '../../../forms.service';
import {ActivatedRoute, Router} from '@angular/router';
import {fieldHasOptions, hasEntriesValidator} from '../validators';

@Component({
  selector: 'app-fields-editor',
  template: `
    <div class="ui segments" *ngIf="formDescription">
      <div class="ui inverted blue segment"><h4>Edit form {{formDescription.title}}</h4></div>
      <div class="ui segment">
        <form class="ui mini form" [formGroup]="form" (submit)="save()" [ngClass]="{error: form.invalid}">
          <div class="ui three fields">
            <div class="field" [ngClass]="{error: form.controls.title.invalid}">
              <label>Form caption</label>
              <input type="text" placeholder="Which programming language do you prefer" formControlName="title"/>
            </div>
            <div class="field" [ngClass]="{error: form.controls.description.invalid}">
              <label>Form description</label>
              <input type="text" formControlName="description"/>
            </div>
            <div class="field" [ngClass]="{error: form.controls.button.invalid}">
              <label>Send button text</label>
              <input type="text" placeholder="Send" formControlName="button"/>
            </div>
          </div>
          <h4 class="ui dividing header">Form fields</h4>
          <div class="ui stackable three column grid">
            <div class="ui basic center aligned column">
              <div class="ui vertical labeled icon buttons">
                <button class="ui green button" (click)="addField('line')" type="button"><i class="terminal icon"></i> Single line text
                  input
                </button>
                <button class="ui green button" (click)="addField('text')" type="button"><i class="align left icon"></i>Multiline text input
                </button>
                <button class="ui green button" (click)="addField('radio')" type="button"><i class="list ul icon"></i>Radio buttons</button>
                <button class="ui green button" (click)="addField('checkbox')" type="button"><i class="tasks icon"></i>Check boxes</button>
                <button class="ui green button" (click)="addField('select')" type="button"><i class="server icon"></i>Single option select
                </button>
                <button class="ui green button" (click)="addField('file')" type="button"><i class="file icon"></i>File upload</button>
              </div>
              <div class="ui error message left aligned" *ngIf="form.controls.fields.errors && form.controls.fields.errors.noEntriesDefined">
                <div class="header">No input fields defined</div>
                <p>Every form should have at least one field</p>
              </div>
            </div>
            <div class="column" *ngFor="let field of formDescription.fields; let i = index">
              <app-field-editor
                [field]="field"
                [form]="form.controls['fields'].controls[i]"
                [index]="i"
                (optionAdd)="addOption(i)"
                (optionRemove)="removeOption(i, $event)"
                (fieldRemove)="removeField(i)"
                (changeOrder)="moveField(i, $event)"></app-field-editor>
            </div>
          </div>
          <div class="ui basic segment right aligned">
            <button class="ui big button" type="button" (click)="cancel()">Cancel</button>
            <button class="ui big green button" type="submit" [disabled]="form.invalid">Save form</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class FormEditorComponent implements OnInit {

  public formDescription: FormDescription;
  @Output('formChange')
  public updates: EventEmitter<FormDescription> = new EventEmitter();

  public form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormsService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  private fieldControl(field: InputField) {
    let options = field.options.map(v => this.optionControl(v));
    return this.fb.group({
      type: this.fb.control(field.type),
      title: this.fb.control(field.title, Validators.required),
      required: this.fb.control(field.required),
      options: fieldHasOptions(field.type)? this.fb.array(options, hasEntriesValidator) : this.fb.array(options)
    });
  }

  private optionControl(value: string) {
    return this.fb.control(value, Validators.required);
  }

  public addField(type: InputType) {
    let field = {type: type, required: false, title: 'New field', options: []};
    this.formDescription.fields.push(field);
    let formFields = this.form.get('fields') as FormArray;
    formFields.push(this.fieldControl(field));
  }

  public removeField(index: number) {
    this.formDescription.fields.splice(index, 1);
    let formFields = this.form.get('fields') as FormArray;
    formFields.removeAt(index);
  }

  public addOption(fieldIndex: number) {
    let newOption = 'New option';
    this.formDescription.fields[fieldIndex].options.push(newOption);
    let formFields = this.form.get('fields').get('' + fieldIndex).get('options') as FormArray;
    formFields.push(this.optionControl(newOption));
  }

  public removeOption(fieldIndex: number, optionIndex: number) {
    this.formDescription.fields[fieldIndex].options.splice(optionIndex, 1);
    let formFields = this.form.get('fields').get('' + fieldIndex).get('options') as FormArray;
    formFields.removeAt(optionIndex);
  }

  public save() {
    if (this.form.valid) {
      this.formService.updateForm(this.form.getRawValue());
      this.router.navigateByUrl('/form/' + this.formDescription.id + '/preview');
    }
  }

  public moveField(from: number, dir: string) {
    const total = this.formDescription.fields.length;
    if (total == 1) return;
    let to;
    switch (dir) {
      case 'sf':
        if (from >= total - 1) return;
        to = from + 1;
        break;
      case 'sb':
        if (from == 0) return;
        to = from - 1;
        break;
      case 'ff':
        if (from >= total - 1) return;
        to = total - 1;
        break;
      case 'fb':
        if (from == 0) return;
        to = 0;
        break;
    }
    let [field] = this.formDescription.fields.splice(from, 1);
    this.formDescription.fields.splice(to, 0, field);

    let formFields = this.form.get('fields') as FormArray;
    let input = formFields.at(from);
    formFields.removeAt(from);
    formFields.insert(to, input);
  }

  public cancel() {
    this.router.navigateByUrl('/form');
  }

  ngOnInit() {
    this.activatedRoute.params.forEach(params => {
      this.formDescription = this.formService.getForm(params.id);
      if (!this.formDescription) this.cancel();
      this.initFields();
    });
  }

  private initFields() {
    let fields = this.formDescription.fields.map(v => this.fieldControl(v));
    this.form = this.fb.group({
      id: this.fb.control(this.formDescription.id),
      title: this.fb.control(this.formDescription.title, Validators.required),
      description: this.fb.control(this.formDescription.description, Validators.required),
      button: this.fb.control(this.formDescription.button, Validators.required),
      fields: this.fb.array(fields, hasEntriesValidator)
    });
    this.form.valueChanges.forEach( values => this.updates.next(values));
  }

}
