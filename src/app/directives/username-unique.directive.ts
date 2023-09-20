import { Directive, Input, OnInit, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { UsersService } from '../users.service'; // Import your user service
import { debounceTime, delay, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[appUsernameUnique][formControlName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UsernameUniqueDirective),
      multi: true,
    },
  ],
})
export class UsernameUniqueDirective implements Validator, OnInit {
  constructor(private userService: UsersService) {}

  @Input() appUsernameUnique!: string; // Property to specify the username field

  ngOnInit() {
    // Subscribe to changes in the username field (specified using appUsernameUnique)
    // and call the server to check uniqueness
  }

  validate(
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validateUsername(c.value);
  }

  private validateUsername(username: string): Observable<ValidationErrors | null> {
    return of(username).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      delay(500),
      switchMap(() => {
        return this.checkUsernameUniqueness(username);
      })
    );
  }

 private checkUsernameUniqueness(username: string): Observable<ValidationErrors | null> {
    return this.userService.getUsers()
      .pipe(
        map((users) => {
          const isUnique = !users.some((user) => user.username === username && username !== this.appUsernameUnique);
          return !isUnique ? {usernameNotUnique: true} : null;
        })
      );
  }
}
