import { Observable } from 'rxjs/internal/Observable';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { SignUpRequestPayload } from 'src/app/models/sign-up-request.payload';
import SignInRequestPayload from 'src/app/models/sign-in-request.payload';
import SignInResponsePayload from 'src/app/models/sign-in-response.payload';
import { map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import UserDetailsResponsePayload from 'src/app/models/user-details-response.payload';
import UserDetailsRequestPayload from 'src/app/models/user-details-request.payload';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SIGN_UP_URL = 'http://localhost:8080/api/user/save';
  private SIGN_IN_URL = 'http://localhost:8080/api/user/login';
  private REFRESH_ACCESS_TOKEN_URL = 'http://localhost:8080/api/user/token/refresh';
  // private LOGOUT_URL = 'http://localhost:8080/api/user/logout';

  private GET_USER_BY_USERNAME = 'http://localhost:8080/api/user/';
  private UPDATE_USER_BY_USERNAME = 'http://localhost:8080/api/user/update/';

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter;

  // @Output() username: EventEmitter<string> = new EventEmitter;

  // After updating user details refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
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

  // Get user details by username
  getUserByUsername(username: string): Observable<UserDetailsResponsePayload> {
    return this.httpClient.get<UserDetailsResponsePayload>(this.GET_USER_BY_USERNAME + username);
  }

  // Update user details in profile page
  updateUserProfile(
    username: string,
    userDetailsRequestPayload: UserDetailsRequestPayload,
    profileImage: File,
    backgroundImage: File
  ): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('profileImage', profileImage);
    formData.append('backgroundImage', backgroundImage);
    formData.append('userDetailsRequest', JSON.stringify(userDetailsRequestPayload));

    return this.httpClient
      .put<any>(this.UPDATE_USER_BY_USERNAME + username, formData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }


}
