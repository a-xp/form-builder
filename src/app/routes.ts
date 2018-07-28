import {Routes} from '@angular/router';
import {FormEditorComponent} from './fb/editor/form-editor/form-editor.component';
import {FormPreviewComponent} from './fb/preview/form-preview/form-preview.component';
import {FormsListComponent} from './forms-list/forms-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'form/:id', component: FormEditorComponent},
  {path: 'form/:id/preview', component: FormPreviewComponent},
  {path: 'form', component: FormsListComponent},
  {path: '', pathMatch: 'full', redirectTo: '/form'},
  {path: '**', component: PageNotFoundComponent}
];
