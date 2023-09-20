import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { NotificationsService } from '../notifications.service';
import { NotificationType } from '../models/Notification';

@Component({
  selector: 'app-create-update-user-modal',
  templateUrl: './create-update-user-modal.component.html',
  styleUrls: ['./create-update-user-modal.component.scss'],
})
export class CreateUpdateUserModalComponent implements OnInit, OnChanges {
  @Input()
  user: User;

  userForm: FormGroup;

  @Output() deleteUser = new EventEmitter<number>();
  @Output() updateUser = new EventEmitter<User>();
  @Output() close = new EventEmitter();

  private readonly fb = inject(FormBuilder)
  private readonly notificationsService = inject(NotificationsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']?.currentValue) {
      setTimeout(() => this.userForm.patchValue({...this.user, repeatPassword: this.user.password}));
    } else {
      setTimeout(() => this.userForm.reset());
    }
  }

  public readonly typeList = ['Admin', 'Driver'];

  onSubmit(): void {
    if (this.userForm.valid) {
      const { repeatPassword, ...formValue } = this.userForm.getRawValue();
      this.updateUser.emit(formValue);
    } else {
      this.notificationsService.addNotification({
        message:'Validation Error',
        type: NotificationType.Error
      })
    }
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }
}
