import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CommentResponsePayload from 'src/app/models/response-dto/comment-response.payload';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css', '../main.component.css']
})
export class TweetDetailsComponent implements OnInit {

  arrowIcon = faArrowLeft;

  tweetId!: number;
  tweet!: TweetResponsePayload;
  jpgFormat: string = 'data:image/jpeg;base64,';
  commentList: CommentResponsePayload[] = [];

  isTweetSection: boolean = false;

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherCommentPage: boolean = true;
  notScrollable: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tweetService: TweetService,
    private commentService: CommentService,
    private spinner: NgxSpinnerService
  ) {
    this.tweetId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTweetById();

    // Refresh dynamiclly page after adding comment
    this.commentService.refreshNeeded$
      .subscribe(() => {
        this.commentList = [];
        this.getCommentsForTweet(0);
      })

    this.getCommentsForTweet(0);
    // this.retrievedImageFromDb = this.jpgFormat + this.tweet.fileContent;

  }

  navigateBackToHomePage() {
    this.router.navigateByUrl('/');
  }

  private getTweetById() {
    this.tweetService
      .getTweetById(this.tweetId)
      .subscribe((tweetResponse) => this.tweet = tweetResponse);
  }

  // When scrolling tweets activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherCommentPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextCommentPage();
    }
  }

  private loadNextCommentPage() {
    // add page and size
    this.getCommentsForTweet(this.currentPageNumber++);
  }

  private getCommentsForTweet(pageNumber: number) {
    this.commentService
      .getAllCommentsForTweetById(this.tweetId, pageNumber)
      .subscribe((commentResponse) => {
        if (commentResponse.length === 0) {
          this.notEmptyAnotherCommentPage = false;
          this.spinner.hide();
        }

        this.commentList = [...this.commentList, ...commentResponse];
        this.notScrollable = true;
      });
  }

  // Refresh dynamiclly tweet details component with comments after delete comment
  handleDeleteComment(commentId: number) {
    // delete comment
    this.commentList = [];
    this.getCommentsForTweet(0);
  }

}
