import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input()
  users: User[] = [];

  @Output() selectUser = new EventEmitter<User>();

  userSelect(user: User): void {
    this.users = this.users.map(userItem=> {
      return user.id ===  userItem.id ? {...userItem, isSelected: true} : {...userItem, isSelected: false}
    });
    this.selectUser.emit(user);
  }

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
