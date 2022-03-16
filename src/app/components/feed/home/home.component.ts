import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../main.component.css']
})
export class HomeComponent implements OnInit {

  headerIcon = faHighlighter;

  userIsLoggedIn!: boolean;

  tweet!: TweetResponsePayload;
  tweetList: TweetResponsePayload[] = [];

  isTweetSection: boolean = true;

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherTweetPage: boolean = true;
  notScrollable: boolean = true;

  constructor(
    private authService: AuthService,
    private tweetService: TweetService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    const userLoggedIn = this.authService.isUserLoggedIn();
    this.setHomePageComponents(userLoggedIn);

    // Refresh dynamiclly page after adding tweet
    this.tweetService.refreshNeeded$
      .subscribe(() => {
        this.tweetList = [];
        this.getAllTweets(0);
      })

    this.getAllTweets(0);
  }

  private setHomePageComponents(userLoggedIn: boolean) {
    if (userLoggedIn) {
      this.userIsLoggedIn = true;
    } else {
      this.userIsLoggedIn = false;
    }
  }

  // When scrolling tweets activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherTweetPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextTweetPage();
    }
  }

  private loadNextTweetPage() {
    // add page and size
    this.getAllTweets(this.currentPageNumber++);
  }

  private getAllTweets(pageNumber: number) {
    this.tweetService
      .getAllTweets(pageNumber)
      .subscribe(
        (tweetResponse) => {
          if (tweetResponse.length === 0) {
            this.notEmptyAnotherTweetPage = false;
            this.spinner.hide();
          }

          this.tweetList = [...this.tweetList, ...tweetResponse];
          this.notScrollable = true;
        }
      )
  }

  // Refresh dynamiclly home component with tweets after delete tweet
  handleDeleteTweet($event: TweetResponsePayload) {
    const tweetIndex: number = this.tweetList.indexOf($event);
    if (tweetIndex != -1) {
      this.tweetList.slice(tweetIndex, 1);
    }
    // should remove from lift without reload
    // this.tweetList = [...this.tweetList];
    this.tweetList = [];
    this.getAllTweets(0);
  }


}

