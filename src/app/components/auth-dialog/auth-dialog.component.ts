import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
  providers: [LoginComponent, RegisterComponent],
})
export class AuthDialogComponent implements OnInit {

  twitterIcon = faTwitter

  constructor(
    private dialogRef: MatDialogRef<any>,
    private router: Router,
    private loginComponent: LoginComponent,
    private registerComponent: RegisterComponent
  ) { }

  ngOnInit(): void {

  }

  closeAuthDialog() {
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }

  signInAuthDialog() {
    this.dialogRef.close();
    this.router.navigateByUrl("/login");
    this.loginComponent.openSignInDialog();
  }

  signUpAuthDialog() {
    this.dialogRef.close();
    this.router.navigateByUrl("/login");
    this.registerComponent.openSignUpDialog();
  }

}
