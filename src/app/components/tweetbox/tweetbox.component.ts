import { throwError } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output } from '@angular/core';
import { faImage, faFileImage, faGripLines, faSmile, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import TweetRequestPayload from 'src/app/models/request-dto/tweet-request.payload';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';
import { filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import CommentRequestPayload from 'src/app/models/request-dto/comment-request.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tweetbox',
  templateUrl: './tweetbox.component.html',
  styleUrls: ['./tweetbox.component.css'],
})
export class TweetboxComponent implements OnInit {

  imageIcon = faImage;
  fileImageIcon = faFileImage;
  gripLinesIcon = faGripLines;
  smileIcon = faSmile;
  calendarIcon = faCalendarCheck

  username!: string;
  profileImage!: string;
  jpgFormat: string = 'data:image/jpeg;base64,';

  tweetForm!: FormGroup;
  tweetRequest!: TweetRequestPayload;
  commentRequest!: CommentRequestPayload;

  dialogRef!: MatDialogRef<UploadImageDialogComponent>;
  uploadedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer | null;

  uploadedImageFileList: File[] = [];
  imageUploadedFrame: boolean = false;

  // Post or comment section
  @Input() isTweetSection!: boolean;
  @Input() tweetId!: number;

  constructor(
    private postService: TweetService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private userSerivce: UserService
  ) {

    this.tweetRequest = {
      description: '',
    }

    this.commentRequest = {
      username: '',
      tweetId: 0,
      text: ''
    }

  }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromLocalStorage();
    this.getUserPicture(this.username);

    this.tweetForm = new FormGroup({
      description: new FormControl(''),
      url: new FormControl('')
    });

  }

  getUserPicture(username: string) {
    this.userSerivce
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.profileImage = this.jpgFormat + userDetails.userProfilePicture;
        },
        (error) => {
          console.log(error);
        });
  }

  // CREATE NEW COMMENT
  async addComment() {
    // Set comment payload
    this.commentRequest.tweetId = Number(this.tweetId);
    this.commentRequest.username = this.authService.getUsernameFromLocalStorage();
    this.commentRequest.text = this.tweetForm.get("description")?.value;
    console.log('Comment Payload: ' + this.commentRequest);

    // Clear tweet box input
    this.tweetForm.reset();

    this.commentService
      .addComment(this.commentRequest)
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.CommentAddedSuccessfully,
            'OK',
            NotificationType.Success
          );
        },
        () => {
          this.notificationService.showNotification(
            NotificationMessage.CommentAddedError,
            'OK',
            NotificationType.Error
          );
          throwError(console.error());
        }
      );
  }

  // CREATE NEW TWEET
  async addTweet() {
    // Set post paylaod
    this.tweetRequest.description = this.tweetForm.get("description")?.value;
    console.log('Tweet Payload: ' + this.tweetRequest);

    // Clear tweet box input
    this.tweetForm.reset();

    // Send post request to post service
    this.postService
      .addTweet(
        this.tweetRequest,
        this.uploadedImageFileList
      )
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.TweetAddedSuccessfully,
            'OK',
            NotificationType.Success
          );
        },
        () => {
          this.notificationService.showNotification(
            NotificationMessage.TweetAddedError,
            'OK',
            NotificationType.Error
          );
          throwError(console.error());
        }
      );
  }

  // Open Dialog to Upload Image
  openUploadImageDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialogRef = this.dialog.open(UploadImageDialogComponent, dialogConfig);

    this.dialogRef
      .afterClosed()
      .subscribe(
        (file) => {
          if (file !== undefined) {
            this.uploadedImage = file;
            // this.uploadedImageList.push(this.uploadedImage);
            this.imageUploadedFrame = true;


            // this.uploadedImageList.push(this.uploadedImage);

            // let reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = () => {
            //   this.imagePreviewUrl = reader.result;
            // };

            //   var reader = new FileReader();
            //   reader.onload = (event: any) => {
            //     this.imagePreviewUrl = event.target.result;
            //   }
            //   reader.readAsDataURL(file);
            //   console.log("file added: " + file)
            // } else {
            //   this.imageUploadedFrame = false;
            //   console.log("error")
          }
        },
        (error) => console.log(error)
      );
  }

  deleteUploadedImage() {
    this.imageUploadedFrame = false;
  }

  uploadFile($event: any) {
    this.uploadedImageFileList = $event.target.files;
    console.log(this.uploadedImageFileList)
  }
}

