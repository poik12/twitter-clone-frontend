import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import CommentRequestPayload from 'src/app/models/comment-request.payload';
import CommentResponsePayload from 'src/app/models/comment-response.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private ADD_COMMENT_URL = 'http://localhost:8080/api/comment/add';
  private GET_COMMENTS_BY_POST_ID_URL = 'http://localhost:8080/api/comment/by-post/';
  private GET_COMMENTS_BY_USERNAME_URL = 'http://localhost:8080/api/comment/by-user/';

  constructor(
    private httpClient: HttpClient
  ) { }

  addComment(commentRequestPaylod: CommentRequestPayload): Observable<any> {
    return this.httpClient.post<any>(this.ADD_COMMENT_URL, commentRequestPaylod);
  }

  getAllCommentsForPostId(postId: number): Observable<CommentResponsePayload[]> {
    return this.httpClient.get<CommentResponsePayload[]>(this.GET_COMMENTS_BY_POST_ID_URL + postId);
  }

  getAllCommentsForUsername(username: string): Observable<CommentResponsePayload[]> {
    return this.httpClient.get<CommentResponsePayload[]>(this.GET_COMMENTS_BY_USERNAME_URL + username);
  }

}
