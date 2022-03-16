import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import NotificationResponsePayload from 'src/app/models/response-dto/notification-response.payload';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../main.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationIcon = faBell

  notificationList: NotificationResponsePayload[] = [];

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherPage: boolean = true;
  notScrollable: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllNotifications(0);

  }

  // When scrolling tweets activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextNotificationPage();
    }
  }

  private loadNextNotificationPage() {
    // add page and size
    this.getAllNotifications(this.currentPageNumber++);
  }

  private getAllNotifications(pageNumber: number) {
    this.notificationService
      .getNotifications(pageNumber)
      .subscribe(
        (notificaitonResponse) => {
          if (notificaitonResponse.length === 0) {
            this.notEmptyAnotherPage = false;
            this.spinner.hide();
          }

          this.notificationList = [...this.notificationList, ...notificaitonResponse];
          this.notScrollable = true;
        }
      )
  }

}
