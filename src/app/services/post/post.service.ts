import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PostRequestPayload from 'src/app/models/request-dto/post-request.payload';
import PostResponsePayload from 'src/app/models/response-dto/post-response.payload';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private GET_POSTS_URL = "http://localhost:8080/api/v1/posts"
  private GET_POST_BY_ID_URL = "http://localhost:8080/api/v1/posts/"
  private GET_POST_BY_USERNAME_URL = "http://localhost:8080/api/v1/posts/by-user/"
  private CREATE_POST_URL = 'http://localhost:8080/api/v1/posts';
  private DELETE_POST_BY_ID_URL = 'http://localhost:8080/api/v1/posts/';
  private LIKE_POST_URL = 'http://localhost:8080/api/v1/posts/like/';
  private GET_LIKED_POSTS_URL = "http://localhost:8080/api/v1/posts/like";

  // After adding post refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAllPosts(): Observable<Array<PostResponsePayload>> {
    return this.httpClient.get<Array<PostResponsePayload>>(this.GET_POSTS_URL);
  }

  createPost(
    postRequestPayload: PostRequestPayload,
    uploadedImage?: File
  ): Observable<any> {
    const formData: FormData = new FormData();

    if (uploadedImage !== undefined) {
      formData.append('file', uploadedImage);
    }
    formData.append('postRequest', JSON.stringify(postRequestPayload));

    return this.httpClient
      .post(this.CREATE_POST_URL, formData)
      .pipe(tap(() => this._refreshNeeded$.next()))
  }

  getPostById(id: number): Observable<PostResponsePayload> {
    return this.httpClient.get<PostResponsePayload>(this.GET_POST_BY_ID_URL + id)
  }

  getPostByUsername(username: string): Observable<Array<PostResponsePayload>> {
    return this.httpClient.get<Array<PostResponsePayload>>(this.GET_POST_BY_USERNAME_URL + username)
  }

  // Post parameters
  likePost(postId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.LIKE_POST_URL + postId)
      .pipe(tap(() => this._refreshNeeded$.next()));
  }

  getLikedPostsForLoggedUser(): Observable<Array<PostResponsePayload>> {
    return this.httpClient.get<Array<PostResponsePayload>>(this.GET_LIKED_POSTS_URL)
  }

  deletePostById(postId: number): Observable<any> {
    return this.httpClient.delete<any>(this.DELETE_POST_BY_ID_URL + postId);
  }
}
