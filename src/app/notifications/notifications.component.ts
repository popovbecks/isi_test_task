import { NotificationsService } from './../notifications.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NotificationData, NotificationType } from '../models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public NotificationType = NotificationType;
  ngOnInit(): void {
    this.notificationsService.notificationData$
      .subscribe((notificationData: NotificationData)=> {
        this.showMessage(notificationData);
      })
  }

  private readonly notificationsService = inject(NotificationsService);

  isVisible = false;
  message: string;
  type: NotificationType;

  showMessage(data: NotificationData): void {
    this.isVisible = true;
    this.type = data.type;
    this.message = data.message;

    setTimeout(()=> this.reset(), data.timeout || 3000)
  }

  private reset(): void {
    this.isVisible = false;
    this.type = null;
    this.message = '';
  }
}
