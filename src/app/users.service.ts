import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly http = inject(HttpClient);

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3100/users');
  }

  addUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`http://localhost:3100/users/`, user);
  }

  updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(`http://localhost:3100/users/${user.id}`, user);
  }

  deleteUser(id: number): any {
    return this.http.delete(`http://localhost:3100/users/${id}`);
  }
}
