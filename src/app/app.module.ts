import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormEditorComponent } from './fb/editor/form-editor/form-editor.component';
import { FormPreviewComponent } from './fb/preview/form-preview/form-preview.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import { FormPageComponent } from './form-page/form-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FieldEditorComponent } from './fb/editor/field-editor/field-editor.component';
import { TypedFieldDirective } from './fb/preview/typed-field.directive';
import {LineInputComponent} from './fb/preview/line-input/line-input.component';
import {RadioGroupComponent} from './fb/preview/radio-group/radio-group.component';
import {CheckboxGroupComponent} from './fb/preview/checkbox-group/checkbox-group.component';
import {FileComponent} from './fb/preview/file/file.component';
import {SingleOptionComponent} from './fb/preview/single-option/single-option.component';
import {TextInputComponent} from './fb/preview/text-input/text-input.component';
import { CheckboxComponent } from './fb/preview/checkbox/checkbox.component';
import { RadioComponent } from './fb/preview/radio/radio.component';


@NgModule({
  declarations: [
    AppComponent,
    FormEditorComponent,
    FormPreviewComponent,
    FormsListComponent,
    PageNotFoundComponent,
    FormPageComponent,
    FieldEditorComponent,
    TypedFieldDirective,
    LineInputComponent,
    RadioGroupComponent,
    CheckboxGroupComponent,
    FileComponent,
    SingleOptionComponent,
    TextInputComponent,
    CheckboxComponent,
    RadioComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    LineInputComponent,
    RadioGroupComponent,
    CheckboxGroupComponent,
    FileComponent,
    SingleOptionComponent,
    TextInputComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
