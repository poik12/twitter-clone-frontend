import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faCheck, faComment, faRetweet, faHeart, faUpload, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import PostResponsePayload from 'src/app/models/response-dto/post-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostService } from 'src/app/services/post/post.service';
import { HomeComponent } from '../feed/home/home.component';
import { FullSizeImageDialogComponent } from './full-size-image-dialog/full-size-image-dialog.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  moreIcon = faEllipsisH;
  verifiedIcon = faCheck;
  commentIcon = faComment;
  shareIcon = faRetweet;
  loveIcon = faHeart;
  uploadIcon = faUpload;

  @Input() post!: PostResponsePayload;

  @Input() imageFileList: any[] = [];
  @Input() retrievedImageFromDb: any;
  jpgFormat: string = 'data:image/jpeg;base64,';
  userProfileImage!: string;

  @Output() public handleDeletePost: EventEmitter<any> = new EventEmitter<any>()

  // @Input() isPostLikedByUser: boolean = false;

  tweetParams = {
    isPostLiked!: false,
    commentCount: 0,
    likesCount: 0,
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private postService: PostService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.imageFileList = this.post.fileContent;

    this.retrievedImageFromDb = this.jpgFormat + this.post.fileContent;
    this.userProfileImage = this.jpgFormat + this.post.userProfilePicture;

    this.tweetParams.commentCount = this.post.commentNo;
    this.tweetParams.likesCount = this.post.likeNo;
  }

  navigateToPostDetails() {
    this.router.navigate(['/post-details', this.post.id]);
  }

  openPostMenu($event: Event) {
    $event.stopPropagation();
  }

  checkIfPostBelongsToLoggedUser() {
    const username = this.authService.getUsernameFromLocalStorage();

    if (this.post.username === username) {
      return true;
    } else {
      return false;
    }
  }

  deletePost(postId: number) {
    console.log("delete post with id: " + postId)
    this.postService
      .deletePostById(postId)
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.PostDeletedSuccessfully,
            'OK',
            NotificationType.Success
          );
          console.log("post deleted")

          this.handleDeletePost.emit(postId);
        }
      );
  }

  navigateToUserDetails($event: Event) {
    $event.stopPropagation();
    this.router.navigate(['/profile', this.post.username]);
  }

  openFullSizeImageDialog($event: Event) {

    // After clicking on image in post open it in full size
    $event.stopPropagation();

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.data = this.retrievedImageFromDb;
    dialogConfig.backdropClass = 'backdropBackground';

    this.dialog.open(FullSizeImageDialogComponent, dialogConfig);
  }

}
