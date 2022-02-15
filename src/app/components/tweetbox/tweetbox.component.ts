import { throwError } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { faImage, faFileImage, faGripLines, faSmile, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import PostRequestPayload from 'src/app/models/post-request.payload';
import { PostService } from 'src/app/services/post/post.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideInAnimation, SlideOutAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';
import { filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

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

  dialogRef!: MatDialogRef<UploadImageDialogComponent>;
  uploadedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer | null;

  uploadedImageList!: File[];
  imageUploadedFrame: boolean = false;

  selectedFile!: File;

  constructor(
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {

    this.postRequestPayload = {
      description: '',
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
    this.authService
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.profileImage = this.jpgFormat + userDetails.userProfilePicture;
        },
        (error) => {
          console.log(error);
        })
  }


  // CREATE NEW POST
  async createPost() {
    // Set create post paylaod
    this.postRequestPayload.description = this.postForm.get("description")?.value;

    // Clear tweet box input
    this.postForm.reset();

    console.log('Post Payload: ' + this.postRequestPayload);

    // Send post payload to post service
    // this.postService
    //   .createPost(
    //     this.postRequestPayload,
    //     this.uploadedImage
    //   )
    //   .subscribe(
    //     () => {
    //       console.log('post added');
    //     },
    //     (error) => {
    //       throwError(console.error());
    //     }
    //   )


    this.postService
      .createPost(
        this.postRequestPayload,
        this.selectedFile
      )
      .subscribe(
        () => {
          this.notificationService.showNotification(
            'Post has been added successfully',
            'OK',
            'success'
          );
        },
        () => {
          this.notificationService.showNotification(
            'Something went wrong while adding the post',
            'OK',
            'error'
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
        (error) => {
          console.log(error);
        }
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
