import {FormArray, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {InputType} from '../../model';

export const hasEntriesValidator: ValidatorFn = (inputs: FormArray): ValidationErrors| null => {
  return !inputs.length ? {'noEntriesDefined': true} : null;
};


export function fieldHasOptions(type: InputType): boolean {
  return [InputType.checkbox, InputType.radio, InputType.select].includes(type);
}
