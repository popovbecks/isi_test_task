import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength][formControlName],[appPasswordStrength][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true,
    },
  ],
})
export class PasswordStrengthDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;

    if (password) {
      // Check if the password meets the strength criteria
      const hasValidLength = password.length >= 8;
      const hasLettersAndNumbers = /[a-zA-Z]/.test(password) && /\d/.test(password);

      if (!hasValidLength || !hasLettersAndNumbers) {
        return { invalidPasswordStrength: true };
      }
    }

    return null; // Password meets the criteria
  }
}
