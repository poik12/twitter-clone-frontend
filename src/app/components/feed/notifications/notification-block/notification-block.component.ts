import { UserService } from './../../../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import NotificationResponsePayload from 'src/app/models/response-dto/notification-response.payload';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-block',
  templateUrl: './notification-block.component.html',
  styleUrls: ['./notification-block.component.css']
})
export class NotificationBlockComponent implements OnInit {

  verifiedIcon = faCheck;
  moreIcon = faEllipsisH;

  @Input('notification') notification!: NotificationResponsePayload;
  jpgFormat: string = 'data:image/jpeg;base64,';

  @Output() handleDeleteNotification: EventEmitter<NotificationResponsePayload> = new EventEmitter();

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void { }

  navigateToDetails() {
    if (this.notification.type == "follower") {
      this.router.navigate(['/profile/' + this.notification.username]);
    } else {
      this.router.navigate(['/tweet-details/' + this.notification.materialId]);
    }
  }

  openNotificationMenu($event: Event) {
    $event.stopPropagation();
  }

  deleteNotificationById(notificationId: number) {
    this.notificationService
      .deleteNotificationById(notificationId)
      .subscribe(() => this.handleDeleteNotification.emit(this.notification));
  }

}
