import { Component, Input, OnInit } from '@angular/core';
import { faComment, faRetweet, faHeart, faUpload } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-parameters',
  templateUrl: './post-parameters.component.html',
  styleUrls: ['./post-parameters.component.css']
})
export class PostParametersComponent implements OnInit {

  commentIcon = faComment;
  shareIcon = faRetweet;
  loveIcon = faHeart;
  uploadIcon = faUpload;

  @Input('postId') postId!: number;
  // Post parameters
  @Input('isPostLiked') isPostLiked!: boolean;
  @Input('likesCount') likesCount!: number;
  @Input('commentCount') commentCount!: number;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  LikePost($event: Event) {
    $event.stopPropagation();

    this.postService
      .likePost(this.postId)
      .subscribe(() => console.log("Post liked/disliked"));
  }

}
