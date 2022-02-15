import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import SignInRequestPayload from 'src/app/models/sign-in-request.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.css', '../auth.component.css'],
})
export class SignInDialogComponent implements OnInit {

  twitterIcon = faTwitter;

  signInForm!: FormGroup;
  signInRequestPayload!: SignInRequestPayload;


  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<SignInRequestPayload>,
    private notificaitonService: NotificationService
  ) {
    this.signInRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  closeSignInDialog() {
    this.dialogRef.close();
  }

  signIn() {
    // Set SignInRequestPayload
    this.signInRequestPayload.username = this.signInForm.get('username')?.value;
    this.signInRequestPayload.password = this.signInForm.get('password')?.value;

    // Send SignInRequestPayload to Auth Service
    this.authService
      .signIn(this.signInRequestPayload)
      .subscribe(
        (data) => {
          if (data) {
            this.router.navigateByUrl('/');
            this.notificaitonService.showNotification(
              'Login Successful',
              'OK',
              'success'
            );
          } else {
            console.log('Bad credentials')
          }
        },
        (error) => {
          this.notificaitonService.showNotification(
            'Bad credentials. Please try again',
            'OK',
            'error'
          );
          console.log(error);
        }
      )
    this.dialogRef.close();
  }


}
