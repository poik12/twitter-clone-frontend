import RepliedPostResponsePayload from 'src/app/models/response-dto/replied-post-response.payload';
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

  private GET_POSTS_PAGE_URL = "http://localhost:8080/api/v1/posts/"
  private GET_POST_BY_ID_URL = "http://localhost:8080/api/v1/posts/"
  private GET_POSTS_PAGE_BY_USERNAME_URL = "http://localhost:8080/api/v1/posts/by-user/"
  private CREATE_POST_URL = 'http://localhost:8080/api/v1/posts';
  private DELETE_POST_BY_ID_URL = 'http://localhost:8080/api/v1/posts/';
  private LIKE_POST_URL = 'http://localhost:8080/api/v1/posts/like/';
  private GET_replied_POSTS_WITH_COMMENTS_BY_USERNAME_URL = "http://localhost:8080/api/v1/posts/like/by-user/"
  private GET_POSTS_COMMENTED_BY_USERNAME_URL = "http://localhost:8080/api/v1/posts/by-post/"

  pageSize: number = 5;

  // After adding post refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAllPosts(pageNumber: number): Observable<PostResponsePayload[]> {
    return this.httpClient.get<PostResponsePayload[]>(this.GET_POSTS_PAGE_URL + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`);
  }

  createPost(
    postRequestPayload: PostRequestPayload,
    uploadedImageFileList?: File[]
  ): Observable<any> {
    // Create json request with FormData
    const formData: FormData = new FormData();
    if (uploadedImageFileList !== undefined) {
      for (let x = 0; x < uploadedImageFileList.length; x++) {
        formData.append("files", uploadedImageFileList[x]);
      }
    }
    formData.append('postRequest', JSON.stringify(postRequestPayload));

    return this.httpClient
      .post(this.CREATE_POST_URL, formData)
      .pipe(tap(() => this._refreshNeeded$.next()))
  }

  getPostById(id: number): Observable<PostResponsePayload> {
    return this.httpClient.get<PostResponsePayload>(this.GET_POST_BY_ID_URL + id)
  }

  getPostsByUsername(username: string, pageNumber: number): Observable<PostResponsePayload[]> {
    return this.httpClient.get<PostResponsePayload[]>(
      this.GET_POSTS_PAGE_BY_USERNAME_URL
      + username
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    )
  }

  likePost(postId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.LIKE_POST_URL + postId)
      .pipe(tap(() => this._refreshNeeded$.next()));
  }

  getLikedPostsByUsername(username: string, pageNumber: number): Observable<PostResponsePayload[]> {
    return this.httpClient.get<PostResponsePayload[]>(
      this.GET_replied_POSTS_WITH_COMMENTS_BY_USERNAME_URL
      + username
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  getRepliedPostsWithCommentsByUsername(username: string, pageNumber: number): Observable<RepliedPostResponsePayload[]> {
    return this.httpClient.get<RepliedPostResponsePayload[]>(
      this.GET_POSTS_COMMENTED_BY_USERNAME_URL
      + username
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  deletePostById(postId: number): Observable<any> {
    return this.httpClient.delete<any>(this.DELETE_POST_BY_ID_URL + postId);
  }
}
