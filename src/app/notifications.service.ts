import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from './models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

 private notificationData$$ = new Subject();

 public readonly notificationData$ = this.notificationData$$.asObservable();

 public addNotification(notification: NotificationData) {
    this.notificationData$$.next(notification);
 }

  constructor() { }
}
