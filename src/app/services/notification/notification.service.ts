import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { NotificationType } from './notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
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

}
