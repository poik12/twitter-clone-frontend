import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NotificationService } from 'src/app/services/notification/notification.service';
import UserDetailsRequestPayload from 'src/app/models/user-details-request.payload';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css', '../../../auth/auth.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  twitterIcon = faTwitter;

  username!: string;

  editProfileForm!: FormGroup;

  hidePassword = true;

  selectedProfileImage!: File;
  selectedBackgroundImage!: File;
  userDetailsRequestPayload: UserDetailsRequestPayload;


  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<any>,
    private notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {

    this.userDetailsRequestPayload = {
      name: '',
      username: '',
      emailAddress: '',
      password: '',
      phoneNumber: ''
    }
  }

  ngOnInit(): void {

    this.username = this.authService.getUsernameFromLocalStorage();

    this.editProfileForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      emailAddress: new FormControl(''),
      password: new FormControl(''),
      phoneNumber: new FormControl(''),
    });

  }

  closeEditProfileDialog() {
    this.dialogRef.close();
  }

  updateProfile() {

    this.userDetailsRequestPayload.name = this.editProfileForm.get('name')?.value;
    this.userDetailsRequestPayload.username = this.editProfileForm.get('username')?.value;
    this.userDetailsRequestPayload.emailAddress = this.editProfileForm.get('emailAddress')?.value;
    this.userDetailsRequestPayload.password = this.editProfileForm.get('password')?.value;
    this.userDetailsRequestPayload.phoneNumber = this.editProfileForm.get('phoneNumber')?.value;

    this.userService
      .updateUserProfile(
        this.username,
        this.userDetailsRequestPayload,
        this.selectedProfileImage,
        this.selectedBackgroundImage
      )
      .subscribe(
        (data) => console.log("success")
      );

    this.dialogRef.close();

    this.notificationService.showNotification(
      NotificationMessage.AccountUpdatedSuccessfully,
      'OK',
      NotificationType.Success
    );
  }

  // Update profile pricture
  updateProfilePicture($event: any) {
    this.selectedProfileImage = $event.target.files[0];
    console.log("Selected profile picture: " + this.selectedProfileImage)
  }

  // Update background pircture
  updateBackgroundPicture($event: any) {
    this.selectedBackgroundImage = $event.target.files[0];
    console.log("Selected background picture: " + this.selectedBackgroundImage)
  }

}
