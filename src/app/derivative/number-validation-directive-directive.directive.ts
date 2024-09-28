import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNumberValidationDirectiveDirective]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NumberValidationDirectiveDirectiveDirective,
    multi: true
  }]
})
export class NumberValidationDirectiveDirectiveDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Basic email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@\.[a-zA-Z]{2,}$/;
 
    if (value && !emailPattern.test(value)) {
      return { 'emailValidator': true };
    }
    return null;
  }

}
