import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  @Input() appMatchPassword: string; // Property to specify the password field to match

  validate(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    const confirmPassword = control.root.get(this.appMatchPassword)?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null; // Passwords match
  }
}
