import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NotificationService } from 'src/app/services/notification/notification.service';
import UserDetailsRequestPayload from 'src/app/models/request-dto/user-details-request.payload';
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

  userDetailsRequestPayload: UserDetailsRequestPayload = {
    name: '',
    emailAddress: '',
    password: '',
    phoneNumber: '',
    description: ''
  };

  constructor(
    private dialogRef: MatDialogRef<any>,
    private notificationService: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.editProfileForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      emailAddress: new FormControl(''),
      password: new FormControl(''),
      phoneNumber: new FormControl(''),
      description: new FormControl('')
    });

  }

  closeEditProfileDialog() {
    this.dialogRef.close();
  }

  updateProfile() {

    this.userDetailsRequestPayload.name = this.editProfileForm.get('name')?.value;
    this.userDetailsRequestPayload.emailAddress = this.editProfileForm.get('emailAddress')?.value;
    this.userDetailsRequestPayload.password = this.editProfileForm.get('password')?.value;
    this.userDetailsRequestPayload.phoneNumber = this.editProfileForm.get('phoneNumber')?.value;
    this.userDetailsRequestPayload.description = this.editProfileForm.get('description')?.value;

    this.userService
      .updateUserProfile(
        this.userDetailsRequestPayload,
        this.selectedProfileImage,
        this.selectedBackgroundImage
      )
      .subscribe(
        () => console.log("UserDetailsRequestPayload: " + this.userDetailsRequestPayload)
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
    console.log("Selected profile picture: " + this.selectedProfileImage);
  }

  // Update background pircture
  updateBackgroundPicture($event: any) {
    this.selectedBackgroundImage = $event.target.files[0];
    console.log("Selected background picture: " + this.selectedBackgroundImage);
  }

}
