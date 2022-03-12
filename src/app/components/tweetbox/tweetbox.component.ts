import { throwError } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output } from '@angular/core';
import { faImage, faFileImage, faGripLines, faSmile, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import PostRequestPayload from 'src/app/models/request-dto/post-request.payload';
import { PostService } from 'src/app/services/post/post.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideInAnimation, SlideOutAnimation } from 'src/app/shared/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';
import { filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import CommentRequestPayload from 'src/app/models/request-dto/comment-request.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import PostResponsePayload from 'src/app/models/response-dto/post-response.payload';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tweetbox',
  templateUrl: './tweetbox.component.html',
  styleUrls: ['./tweetbox.component.css'],
  animations: [
    trigger('addNewPost', [
      // transition(':enter', [useAnimation(slideInAnimation)]),
      // transition(':leave', [useAnimation(SlideOutAnimation)]),
    ])
  ]
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

  postForm!: FormGroup;
  postRequestPayload!: PostRequestPayload;
  commentRequestPayload!: CommentRequestPayload;

  dialogRef!: MatDialogRef<UploadImageDialogComponent>;
  uploadedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer | null;

  uploadedImageList!: File[];
  imageUploadedFrame: boolean = false;

  selectedFile!: File;

  // Post or comment section
  @Input() isPostSection!: boolean;
  @Input() postId!: number;

  constructor(
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private userSerivce: UserService
  ) {

    this.postRequestPayload = {
      description: '',
    }

    this.commentRequestPayload = {
      username: '',
      postId: 0,
      text: ''
    }

  }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromLocalStorage();
    this.getUserPicture(this.username);

    this.postForm = new FormGroup({
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
  async createComment() {
    // Set comment payload
    this.commentRequestPayload.postId = Number(this.postId);
    this.commentRequestPayload.username = this.authService.getUsernameFromLocalStorage();
    this.commentRequestPayload.text = this.postForm.get("description")?.value;
    console.log('Comment Payload: ' + this.commentRequestPayload);

    // Clear tweet box input
    this.postForm.reset();

    this.commentService
      .addComment(this.commentRequestPayload)
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

  // CREATE NEW POST
  async createPost() {
    // Set post paylaod
    this.postRequestPayload.description = this.postForm.get("description")?.value;
    console.log('Post Payload: ' + this.postRequestPayload);

    // Clear tweet box input
    this.postForm.reset();

    // Send post request to post service
    this.postService
      .createPost(
        this.postRequestPayload,
        this.selectedFile
      )
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.PostAddedSuccessfully,
            'OK',
            NotificationType.Success
          );
        },
        () => {
          this.notificationService.showNotification(
            NotificationMessage.PostAddedError,
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

            this.uploadedImageList.push(this.uploadedImage);

            this.imageUploadedFrame = true;


            // this.uploadedImageList.push(this.uploadedImage);

            // const reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = () => {
            //   this.imagePreviewUrl = reader.result;
            // };

            // var reader = new FileReader();
            // reader.onload = (event: any) => {
            //   this.imageUrl = event.target.result;
            // }
            // reader.readAsDataURL(file);

          } else {
            this.imageUploadedFrame = false;
            console.log("error")
          }
        },
        (error) => console.log(error)
      );
  }

  deleteUploadedImage() {
    this.imageUploadedFrame = false;
  }

  uploadFile($event: any) {
    this.selectedFile = $event.target.files[0];
    console.log(this.selectedFile)
  }


}
