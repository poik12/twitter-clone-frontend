import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { NotificationType } from './notification-type.enum';
import NotificationResponsePayload from 'src/app/models/response-dto/notification-response.payload';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private NOTIFICATIONS_URL = 'http://localhost:8080/api/v1/notifications';

  private pageSize: number = 10;

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  showNotification(
    displayMessage: string,
    buttonText: string,
    messageType: NotificationType.Error | NotificationType.Success
  ) {
    this.snackBar.openFromComponent(
      NotificationComponent,
      {
        data: {
          message: displayMessage,
          buttonText: buttonText,
          type: messageType
        },
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: messageType
      }
    );
  }

  getNotifications(pageNumber: number): Observable<NotificationResponsePayload[]> {
    return this.httpClient.get<NotificationResponsePayload[]>(
      this.NOTIFICATIONS_URL + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  deleteNotificationById(notificationId: number): Observable<any> {
    return this.httpClient.delete<any>(this.NOTIFICATIONS_URL + `/${notificationId}`);
  }
}
