import { Injectable } from '@angular/core';
import UserDetailsResponsePayload from 'src/app/models/response-dto/user-details-response.payload';
import UserDetailsRequestPayload from 'src/app/models/request-dto/user-details-request.payload';
import { Subject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private GET_USER_BY_USERNAME_URL = 'http://localhost:8080/api/v1/users/';
  private UPDATE_USER_DETAILS_URL = 'http://localhost:8080/api/v1/users/';

  private FOLLOW_USER_URL = 'http://localhost:8080/api/v1/users/follow/';
  private UNFOLLOW_USER_URL = 'http://localhost:8080/api/v1/users/unfollow/';
  private CHECK_FOLLOWER_URL = 'http://localhost:8080/api/v1/users/';

  // After updating user details refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  // Get user details by username
  getUserByUsername(username: string): Observable<UserDetailsResponsePayload> {
    return this.httpClient.get<UserDetailsResponsePayload>(this.GET_USER_BY_USERNAME_URL + username);
  }

  // Update user details in profile page
  updateUserProfile(
    userDetailsRequestPayload: UserDetailsRequestPayload,
    profileImage: File,
    backgroundImage: File
  ): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('profileImage', profileImage);
    formData.append('backgroundImage', backgroundImage);
    formData.append('userDetailsRequest', JSON.stringify(userDetailsRequestPayload));

    return this.httpClient
      .put<any>(this.UPDATE_USER_DETAILS_URL, formData)
      .pipe(tap(() => this._refreshNeeded$.next()));
  }

  followUser(username: String): Observable<any> {
    return this.httpClient.post<any>(this.FOLLOW_USER_URL, username)
  }

  unfollowUser(username: String): Observable<any> {
    return this.httpClient.post<any>(this.UNFOLLOW_USER_URL, username)
  }

  checkFollowing(follower: String, following: String): Observable<boolean> {
    return this.httpClient.get<boolean>(this.CHECK_FOLLOWER_URL + follower + "/" + following);
  }
}
