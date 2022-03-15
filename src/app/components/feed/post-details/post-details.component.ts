import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CommentResponsePayload from 'src/app/models/response-dto/comment-response.payload';
import PostResponsePayload from 'src/app/models/response-dto/post-response.payload';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css', '../main.component.css']
})
export class PostDetailsComponent implements OnInit {

  arrowIcon = faArrowLeft;

  postId!: number;
  post!: PostResponsePayload;

  // retrievedImageFromDb: any;

  jpgFormat: string = 'data:image/jpeg;base64,';

  commentList: CommentResponsePayload[] = [];

  isPostSection: boolean = false;

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherCommentPage: boolean = true;
  notScrollable: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private spinner: NgxSpinnerService
  ) {
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPostById();

    // Refresh dynamiclly page after adding comment
    this.commentService.refreshNeeded$
      .subscribe(() => {
        this.commentList = [];
        this.getCommentsForPost(0);
      })

    this.getCommentsForPost(0);
    // this.retrievedImageFromDb = this.jpgFormat + this.post.fileContent;

  }

  navigateBackToHomePage() {
    this.router.navigateByUrl('/');
  }

  private getPostById() {
    this.postService
      .getPostById(this.postId)
      .subscribe((postResponse) => this.post = postResponse);
  }

  // When scrolling posts activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherCommentPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextCommentPage();
    }
  }

  private loadNextCommentPage() {
    // add page and size
    this.getCommentsForPost(this.currentPageNumber++);
  }

  private getCommentsForPost(pageNumber: number) {
    this.commentService
      .getAllCommentsForPostId(this.postId, pageNumber)
      .subscribe((commentResponse) => {
        if (commentResponse.length === 0) {
          this.notEmptyAnotherCommentPage = false;
          this.spinner.hide();
        }

        this.commentList = [...this.commentList, ...commentResponse];
        this.notScrollable = true;
      });
  }

  // Refresh dynamiclly post details component with comments after delete comment
  handleDeleteComment(commentId: number) {
    // delete comment
    this.commentList = [];
    this.getCommentsForPost(0);
  }

}
