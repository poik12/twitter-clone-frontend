import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import PostResponsePayload from 'src/app/models/post-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../main.component.css']
})
export class HomeComponent implements OnInit {

  headerIcon = faHighlighter;

  userIsLoggedIn!: boolean;

  post!: PostResponsePayload;
  postList: Array<PostResponsePayload> = [];

  @Output() reloadMainComponent!: boolean;
  isPostSection: boolean = true;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const userLoggedIn = this.authService.isUserLoggedIn();
    this.setHomePageComponents(userLoggedIn);

    // Refresh dynamiclly page after adding post
    this.postService.refreshNeeded$
      .subscribe(() => {
        this.getAllPosts();
      })

    this.getAllPosts();

  }

  private setHomePageComponents(userLoggedIn: boolean) {
    if (userLoggedIn) {
      this.userIsLoggedIn = true;
    } else {
      this.userIsLoggedIn = false;
    }
  }

  private getAllPosts() {
    this.postService
      .getAllPosts()
      .subscribe(
        (postResponse) => {
          this.postList = postResponse;
        }
      )
  }

  // Refresh dynamiclly home component with posts after delete post
  handleDeletePost(postId: number) {
    this.getAllPosts();
  }

}

