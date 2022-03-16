import { UserService } from './../../../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import NotificationResponsePayload from 'src/app/models/response-dto/notification-response.payload';

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

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  navigateToDetails() {
    if (this.notification.type == "follower") {
      this.router.navigate(['/profile/' + this.notification.username]);
    } else {
      this.router.navigate(['/tweet-details/' + this.notification.materialId]);
    }
  }
}
