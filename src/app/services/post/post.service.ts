import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PostRequestPayload from 'src/app/models/post-request.payload';
import PostResponsePayload from 'src/app/models/post-response.payload';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private GET_POSTS = "http://localhost:8080/api/post/all"
  private GET_POST_BY_ID = "http://localhost:8080/api/post/"
  private GET_POST_BY_USERNAME = "http://localhost:8080/api/post/by-user/"
  private CREATE_POST = 'http://localhost:8080/api/post/add';
  private DELETE_POST_BY_ID = 'http://localhost:8080/api/post/delete/';

  // After adding post refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAllPosts(): Observable<Array<PostResponsePayload>> {
    return this.httpClient.get<Array<PostResponsePayload>>(this.GET_POSTS);
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
      .post(this.CREATE_POST, formData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
  }

  getPostById(id: number): Observable<PostResponsePayload> {
    return this.httpClient.get<PostResponsePayload>(this.GET_POST_BY_ID + id)
  }

  getPostByUsername(username: string): Observable<Array<PostResponsePayload>> {
    return this.httpClient.get<Array<PostResponsePayload>>(this.GET_POST_BY_USERNAME + username)
  }

  // Post parameters
  likePost() {
    throw new Error('Method not implemented.');
  }

  deletePostById(postId: number): Observable<any> {
    return this.httpClient.delete<any>(this.DELETE_POST_BY_ID + postId);
  }
}
