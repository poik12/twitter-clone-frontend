import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { SignUpRequestPayload } from 'src/app/models/request-dto/sign-up-request.payload';
import SignInRequestPayload from 'src/app/models/request-dto/sign-in-request.payload';
import SignInResponsePayload from 'src/app/models/response-dto/sign-in-response.payload';
import { map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SIGN_UP_URL = 'http://localhost:8080/api/v1/auth/register';
  private SIGN_IN_URL = 'http://localhost:8080/api/v1/auth/login';
  private REFRESH_ACCESS_TOKEN_URL = 'http://localhost:8080/api/v1/auth/token/refresh';
  // private LOGOUT_URL = 'http://localhost:8080/api/v1/auth/logout';

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter;

  // @Output() username: EventEmitter<string> = new EventEmitter;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  // Sign Up Method
  signUp(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(this.SIGN_UP_URL, signUpRequestPayload, { responseType: 'text' })
  }

  // Login Method
  signIn(signInRequestPayload: SignInRequestPayload) {
    return this.httpClient
      .post<SignInResponsePayload>(this.SIGN_IN_URL, signInRequestPayload)
      .pipe(map(
        signInResponsePayload => {
          //  Store parameters from Login Response for user in Local Storage
          // this.localStorage.store('logged_user', signInResponsePayload)
          this.localStorage.store('username', signInResponsePayload.username)
          this.localStorage.store('authenticationToken', signInResponsePayload.authenticationToken);
          this.localStorage.store('expiresAt', signInResponsePayload.expiresAt);
          this.localStorage.store('refreshToken', signInResponsePayload.refreshToken);

          // User is logged in
          // this.isLoggedIn.emit(true);
          // this.username.emit(signInResponsePayload.username);
          return true;
        }
      ))
  }

  // Retrieve authentication Token from local storage
  getJwtTokenFromLocalStorage() {
    return this.localStorage.retrieve('authenticationToken');
  }

  // Get refresh token from db
  getRefreshToken() {
    // Create refresh token request
    const refreshTokenRequestPayload = {
      username: this.getUsernameFromLocalStorage(),
      refreshToken: this.getRefreshTokenFromLocalStorage()
    }

    // Get new auth token and store it in local storage
    return this.httpClient
      .post<SignInResponsePayload>(this.REFRESH_ACCESS_TOKEN_URL, refreshTokenRequestPayload)
      .pipe(tap(
        (response) => {
          this.localStorage.store('authenticationToken', response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        }
      ));
  }

  // Get username from local storage for resfresh token request
  getUsernameFromLocalStorage() {
    return this.localStorage.retrieve('username');
  }
  // Get refresh token from local storage for resfresh token request
  private getRefreshTokenFromLocalStorage() {
    return this.localStorage.retrieve('refreshToken');
  }

  // Check if user is logged
  isUserLoggedIn(): boolean {
    return this.getJwtTokenFromLocalStorage() != null;
  }

  // Logout funcionality
  logout() {
    this.localStorage.clear('username')
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('refreshToken');
    this.router.navigateByUrl("/login");

  }

}
