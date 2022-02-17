import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpRequestPayload } from 'src/app/models/sign-up-request.payload';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.css', '../auth.component.css'],
})
export class SignUpDialogComponent implements OnInit {

  twitterIcon = faTwitter;

  signUpForm!: FormGroup;
  signUpRequestPayload!: SignUpRequestPayload;

  hidePassword = true;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignUpRequestPayload>,
    private notificationService: NotificationService
  ) {
    this.signUpRequestPayload = {
      name: '',
      username: '',
      emailAddress: '',
      password: '',
      phoneNumber: ''
    };
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    });
  }

  closeSignUpDialog() {
    this.dialogRef.close();
  }

  signUp() {
    // Set SignUpRequestPayload from Form Control inputs
    this.signUpRequestPayload.name = this.signUpForm.get('name')?.value;
    this.signUpRequestPayload.username = this.signUpForm.get('username')?.value;
    this.signUpRequestPayload.emailAddress = this.signUpForm.get('emailAddress')?.value;
    this.signUpRequestPayload.password = this.signUpForm.get('password')?.value;
    this.signUpRequestPayload.phoneNumber = this.signUpForm.get('phoneNumber')?.value;
    console.log(this.signUpRequestPayload);
    // Send SignUpRequestPayload to Auth Service and get response
    this.authService.signUp(this.signUpRequestPayload)
      .subscribe(
        () => {
          console.log("Success");
          this.notificationService.showNotification(
            NotificationMessage.RegistrationSuccess,
            'OK',
            NotificationType.Success
          )
        },
        (error) => {
          this.notificationService.showNotification(
            NotificationMessage.RegistrationError,
            'OK',
            NotificationType.Error
          );
          console.log(error);
        }
      )

    this.dialogRef.close();
  }
}
