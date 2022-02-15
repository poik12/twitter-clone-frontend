import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faTwitter, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.component.css'],
})
export class RegisterComponent implements OnInit {

  twitterIcon = faTwitter;
  appleIcon = faApple;
  googleIcon = faGoogle;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSignUpDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SignUpDialogComponent, dialogConfig);
  }

}
