import { Component, Input, OnInit } from '@angular/core';
import { faComment, faRetweet, faHeart, faUpload } from '@fortawesome/free-solid-svg-icons';
import { TweetService } from 'src/app/services/tweet/tweet.service';

@Component({
  selector: 'app-tweet-parameters',
  templateUrl: './tweet-parameters.component.html',
  styleUrls: ['./tweet-parameters.component.css']
})
export class TweetParametersComponent implements OnInit {

  commentIcon = faComment;
  shareIcon = faRetweet;
  loveIcon = faHeart;
  uploadIcon = faUpload;

  @Input('tweetId') tweetId!: number;
  // tweet parameters
  @Input('isTweetLiked') isTweetLiked!: boolean;
  @Input('likesCount') likesCount!: number;
  @Input('commentCount') commentCount!: number;

  constructor(
    private tweetService: TweetService
  ) { }

  ngOnInit(): void {
  }

  LikeTweet($event: Event) {
    $event.stopPropagation();

    this.tweetService
      .likeTweet(this.tweetId)
      .subscribe(() => console.log("Tweet liked/disliked"));
  }

}
