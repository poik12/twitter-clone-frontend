import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import CommentRequestPayload from 'src/app/models/request-dto/comment-request.payload';
import CommentResponsePayload from 'src/app/models/response-dto/comment-response.payload';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private ADD_COMMENT_URL = 'http://localhost:8080/api/v1/comments';
  private GET_COMMENTS_BY_TWEET_ID_URL = 'http://localhost:8080/api/v1/comments/by-tweet/';
  private GET_COMMENTS_BY_USERNAME_URL = 'http://localhost:8080/api/v1/comments/by-user/';
  private DELETE_COMMENT_BY_ID_URL = 'http://localhost:8080/api/v1/comments/';

  private pageSize: number = 10;

  // After adding comment refresh page
  private _refreshNeeded$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  addComment(commentRequestPaylod: CommentRequestPayload): Observable<any> {
    return this.httpClient
      .post<any>(this.ADD_COMMENT_URL, commentRequestPaylod)
      .pipe(tap(() => this._refreshNeeded$.next()));
  }

  getAllCommentsForTweetById(tweetId: number, pageNumber: number): Observable<CommentResponsePayload[]> {
    return this.httpClient.get<CommentResponsePayload[]>(this.GET_COMMENTS_BY_TWEET_ID_URL + tweetId + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`);
  }

  getAllUserCommentsForTweet(username: string, tweetId: number): Observable<CommentResponsePayload[]> {
    return this.httpClient.get<CommentResponsePayload[]>(this.GET_COMMENTS_BY_USERNAME_URL + username + "/" + tweetId);
  }

  deleteCommentById(commentId: number): Observable<any> {
    return this.httpClient.delete<any>(this.DELETE_COMMENT_BY_ID_URL + commentId);
  }

}
