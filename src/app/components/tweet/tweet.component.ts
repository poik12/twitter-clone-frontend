import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faCheck, faComment, faRetweet, faHeart, faUpload, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { FullSizeImageDialogComponent } from './full-size-image-dialog/full-size-image-dialog.component';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  moreIcon = faEllipsisH;
  verifiedIcon = faCheck;
  commentIcon = faComment;
  shareIcon = faRetweet;
  loveIcon = faHeart;
  uploadIcon = faUpload;

  @Input() tweet!: TweetResponsePayload;
  jpgFormat: string = 'data:image/jpeg;base64,';
  userProfileImage!: string;

  @Output() handleDeleteTweet: EventEmitter<TweetResponsePayload> = new EventEmitter();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tweetService: TweetService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void { }

  navigateToTweetDetails() {
    this.router.navigate(['/tweet-details', this.tweet.id]);
  }

  openTweetMenu($event: Event) {
    $event.stopPropagation();
  }

  checkIfTweetBelongsToLoggedUser() {
    const username = this.authService.getUsernameFromLocalStorage();

    if (this.tweet.username === username) {
      return true;
    } else {
      return false;
    }
  }

  deleteTweetById(tweetId: number) {
    this.tweetService
      .deleteTweetById(tweetId)
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.TweetDeletedSuccessfully,
            'OK',
            NotificationType.Success
          );
          console.log("tweet deleted")

          this.handleDeleteTweet.emit(this.tweet);
        }
      );
  }

  navigateToUserDetails($event: Event) {
    $event.stopPropagation();
    this.router.navigate(['/profile', this.tweet.username]);
  }

  openFullSizeImageDialog($event: Event, imageFile: number) {
    $event.stopPropagation(); // After clicking on image in tweet open it in full size

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.data = this.jpgFormat + this.tweet.fileContent[imageFile];
    dialogConfig.backdropClass = 'backdropBackground';

    this.dialog.open(FullSizeImageDialogComponent, dialogConfig);
  }

}

