import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if user is logged or not
    const isAuthenticated = this.authService.isUserLoggedIn();

    if (isAuthenticated) {
      return true;
    } else {
      // Open login or register dialog
      this.openAuthenticationDialog();
      return false;
    }

  }

  openAuthenticationDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AuthDialogComponent, dialogConfig);
  }

}
