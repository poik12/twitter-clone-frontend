import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faTwitter, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css']
})
export class LoginComponent implements OnInit {

  twitterIcon = faTwitter;
  appleIcon = faApple;
  googleIcon = faGoogle;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
