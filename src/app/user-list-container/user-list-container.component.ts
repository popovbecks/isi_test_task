import { Component, inject } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { User } from '../models/User';
import { UsersService } from '../users.service';
import { NotificationsService } from '../notifications.service';
import { NotificationType } from '../models/Notification';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
})
export class UserListContainerComponent {
  private readonly usersService = inject(UsersService);
  private readonly notificationsService = inject(NotificationsService);

  public users$: Observable<User[]> = of([]);

  public selectedUser: User = null;
  public isModalOpen = false;

  selectUserItem(selectedUser: User) {
    this.selectedUser = {...selectedUser};
    this.isModalOpen = true;
  }

  createUser() {
    this.isModalOpen = true;
    this.selectedUser = null;
  }

  updateUser(user: User): void {
    if (user.id) {
      this.usersService
        .updateUser(user)
        .pipe(take(1))
        .subscribe(() => {
          this.updateUsersObservable(user);
          this.notificationsService.addNotification({
            type: NotificationType.Success,
            message: 'User has been successfuly updated'
          });
        });
    } else {
      this.usersService
        .addUser(user)
        .pipe(take(1))
        .subscribe(() => {
          this.updateUsersObservable(user);
          this.notificationsService.addNotification({
            type: NotificationType.Success,
            message: 'User has been successfuly created'
          });
        });
    }
  }

  private updateUsersObservable(updatedUser: User): void {
    this.closeModal();
    this.users$ = this.users$.pipe(
      switchMap((users) => {
        const index = users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          users[index] = updatedUser;
        } else {
          users.push(updatedUser);
        }
        return of([...users]);
      })
    );
  }

  public deleteUser(id: number): void {
    this.usersService
      .deleteUser(id)
      .pipe(take(1))
      .subscribe(() => {
        this.closeModal();
        this.users$ = this.users$.pipe(
          switchMap((users) => {
            const updatedUsers = users.filter((user) => user.id !== id);
            return of(updatedUsers);
          })
        );
      });
  }

  public closeModal(): void {
    this.selectedUser = null;
    this.isModalOpen = false;
    this.resetSelectedItem();
  }

  private resetSelectedItem(): void {
    this.users$ = this.users$.pipe(
      switchMap((users) => {
        const updatedUsers = users.map((user) => {
          return {...user, isSelected: false}
        });
        return of(updatedUsers);
      })
    );
  }

  private getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
