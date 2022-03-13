import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import PostResponsePayload from 'src/app/models/response-dto/post-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../main.component.css']
})
export class HomeComponent implements OnInit {

  headerIcon = faHighlighter;

  userIsLoggedIn!: boolean;

  post!: PostResponsePayload;
  postList: PostResponsePayload[] = [];

  @Output() reloadMainComponent!: boolean;
  isPostSection: boolean = true;

  // Loading spinner for retrieving data from db
  currentPageNumber: number = 1;
  notEmptyAnotherTweetPage: boolean = true;
  notScrollable: boolean = true;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    const userLoggedIn = this.authService.isUserLoggedIn();
    this.setHomePageComponents(userLoggedIn);

    // Refresh dynamiclly page after adding post
    this.postService.refreshNeeded$
      .subscribe(() => {
        this.postList = [];
        this.getAllPosts(0);
      })

    this.getAllPosts(0);
  }

  private setHomePageComponents(userLoggedIn: boolean) {
    if (userLoggedIn) {
      this.userIsLoggedIn = true;
    } else {
      this.userIsLoggedIn = false;
    }
  }

  // When scrolling posts activate this function
  onScroll() {
    if (this.notScrollable && this.notEmptyAnotherTweetPage) {
      this.spinner.show();
      this.notScrollable = false;
      this.loadNextPostPage();
    }
  }

  private loadNextPostPage() {
    // add page and size
    this.getAllPosts(this.currentPageNumber++);
  }

  private getAllPosts(pageNumber: number) {
    this.postService
      .getAllPosts(pageNumber)
      .subscribe(
        (postResponse) => {
          if (postResponse.length === 0) {
            this.notEmptyAnotherTweetPage = false;
            this.spinner.hide();
          }

          this.postList = [...this.postList, ...postResponse];
          this.notScrollable = true;
        }
      )
  }

  // Refresh dynamiclly home component with posts after delete post
  handleDeletePost(postId: number) {
    this.postList = [];
    this.getAllPosts(0);
  }

}

