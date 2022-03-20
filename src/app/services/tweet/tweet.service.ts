import RepliedTweetResponsePayload from 'src/app/models/response-dto/replied-tweet-response.payload';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TweetRequestPayload from 'src/app/models/request-dto/tweet-request.payload';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private GET_TWEETS_URL = "http://localhost:8080/api/v1/tweets/"
  private GET_TWEET_BY_ID_URL = "http://localhost:8080/api/v1/tweets/"
  private GET_TWEET_PAGE_BY_USERNAME_URL = "http://localhost:8080/api/v1/tweets/by-user/"
  private ADD_TWEET_URL = 'http://localhost:8080/api/v1/tweets';
  private DELETE_TWEET_BY_ID_URL = 'http://localhost:8080/api/v1/tweets/';
  private LIKE_TWEET_URL = 'http://localhost:8080/api/v1/tweets/like/';
  private GET_REPLIED_TWEETS_WITH_COMMENTS_BY_USERNAME_URL = "http://localhost:8080/api/v1/tweets/like/by-user/"
  private GET_TWEETS_COMMENTED_BY_USERNAME_URL = "http://localhost:8080/api/v1/tweets/by-tweet/"
  private GET_TWEETS_BY_SERACH_HASHTAG_URL = "http://localhost:8080/api/v1/tweets/search/"

  pageSize: number = 5;

  // After adding post refresh page
  private _refreshNeeded$ = new Subject<void>();

  // SEraching - pass data between 2 different components via service
  private searchedTweets = new BehaviorSubject<TweetResponsePayload[]>([]);
  foundTweets = this.searchedTweets.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAllTweets(pageNumber: number): Observable<TweetResponsePayload[]> {
    return this.httpClient.get<TweetResponsePayload[]>(this.GET_TWEETS_URL + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`);
  }

  addTweet(
    tweetRequest: TweetRequestPayload,
    uploadedImageFileList?: File[]
  ): Observable<any> {
    // Create json request with FormData
    const formData: FormData = new FormData();
    if (uploadedImageFileList !== undefined) {
      for (let x = 0; x < uploadedImageFileList.length; x++) {
        formData.append("files", uploadedImageFileList[x]);
      }
    }
    formData.append('tweetRequestJson', JSON.stringify(tweetRequest));

    return this.httpClient
      .post(this.ADD_TWEET_URL, formData)
      .pipe(tap(() => this._refreshNeeded$.next()))
  }

  getTweetById(tweetId: number): Observable<TweetResponsePayload> {
    return this.httpClient.get<TweetResponsePayload>(this.GET_TWEET_BY_ID_URL + tweetId)
  }

  getTweetsByUsername(username: string, pageNumber: number): Observable<TweetResponsePayload[]> {
    return this.httpClient.get<TweetResponsePayload[]>(
      this.GET_TWEET_PAGE_BY_USERNAME_URL
      + username
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    )
  }

  likeTweet(tweetId: number): Observable<any> {
    return this.httpClient
      .get<any>(this.LIKE_TWEET_URL + tweetId)
      .pipe(tap(() => this._refreshNeeded$.next()));
  }

  getLikedTweetsByUsername(username: string, pageNumber: number): Observable<TweetResponsePayload[]> {
    return this.httpClient.get<TweetResponsePayload[]>(
      this.GET_REPLIED_TWEETS_WITH_COMMENTS_BY_USERNAME_URL
      + username
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  getRepliedTweetsWithCommentsByUsername(username: string, pageNumber: number): Observable<RepliedTweetResponsePayload[]> {
    return this.httpClient.get<RepliedTweetResponsePayload[]>(
      this.GET_TWEETS_COMMENTED_BY_USERNAME_URL
      + username
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  deleteTweetById(tweetId: number): Observable<any> {
    return this.httpClient.delete<any>(this.DELETE_TWEET_BY_ID_URL + tweetId);
  }

  findTweetBySearchTerm(searchTerm: string, pageNumber: number): Observable<TweetResponsePayload[]> {
    return this.httpClient.get<TweetResponsePayload[]>(
      this.GET_TWEETS_BY_SERACH_HASHTAG_URL
      + searchTerm
      + `?pageNumber=${pageNumber}&pageSize=${this.pageSize}`
    );
  }

  sendSearchedTweets(tweets: TweetResponsePayload[]) {
    this.searchedTweets.next(tweets);
  }

}
