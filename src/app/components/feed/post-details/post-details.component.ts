import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CommentResponsePayload from 'src/app/models/comment-response.payload';
import PostResponsePayload from 'src/app/models/post-response.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css', '../main.component.css']
})
export class PostDetailsComponent implements OnInit {

  arrowIcon = faArrowLeft;

  postId!: number;
  post!: PostResponsePayload;

  retrievedImageFromDb: any;
  jpgFormat: string = 'data:image/jpeg;base64,';

  commentForm!: FormGroup;
  // commentPayload: CommentRequestPayload;

  commentList!: CommentResponsePayload[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
    this.retrievedImageFromDb = this.jpgFormat + this.post.fileContent;
  }

  navigateBackToHomePage() {
    this.router.navigateByUrl('/');
  }

  private getPostById() {
    this.postService
      .getPostById(this.postId)
      .subscribe(
        (postResponse) => {
          this.post = postResponse;
        }
      )
  }

  private getCommentsForPost() {
    this.commentService
      .getAllCommentsForPostId(this.postId)
      .subscribe((commentResponse) => {
        this.commentList = commentResponse;
      });
  }

}
