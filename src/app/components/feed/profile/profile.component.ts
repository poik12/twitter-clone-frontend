import ConversationRequestPayload from 'src/app/models/request-dto/conversation-request.payload';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeft, faCalendar, faBell, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import FollowerDto from 'src/app/models/response-dto/follower-response.payload';
import PostResponsePayload from 'src/app/models/response-dto/post-response.payload';
import UserDetailsResponsePayload from 'src/app/models/response-dto/user-details-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'src/app/services/message/message.service';
import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { FollowersDialogComponent } from './followers-dialog/followers-dialog.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../main.component.css']
})
export class ProfileComponent implements OnInit {

  arrowIcon = faArrowLeft;
  calendarIcon = faCalendar;
  notificationIcon = faBell;
  moreIcon = faEllipsisH;

  loggedUser: string;
  username: string;

  userDetails!: UserDetailsResponsePayload;
  userProfilePicture!: string;
  userBackgroundPicture!: string;
  jpgFormat: string = 'data:image/jpeg;base64,';

  postList: PostResponsePayload[] = []; // user tweets list
  likedPostList: PostResponsePayload[] = []; // user liked tweets list

  // Loading spinner for retrieving data from db
  currentTweetPageNumber: number = 1;
  notEmptyAnotherTweetPage: boolean = true;
  notScrollableTweet: boolean = true;

  currentLikedTweetPageNumber: number = 1;
  notEmptyAnotherLikedTweetPage: boolean = true;
  notScrollableLikedTweet: boolean = true;

  isUserProfileFollowed!: boolean;

  conversationRequestPayload: ConversationRequestPayload = {
    participantUsername: ''
  };

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) {
    // Get currently logged user
    this.loggedUser = this.authService.getUsernameFromLocalStorage();

    // Get username from activated route http://localhost:4200/profile/:username in sidebar
    this.username = this.activatedRouter.snapshot.params['username'];

    // Get user details by username from acitvated route
    this.getUserDetails(this.username);
  }

  ngOnInit(): void {
    // Check if user is followed
    this.userService
      .checkFollowing(this.loggedUser, this.username)
      .subscribe((response: boolean) => this.isUserProfileFollowed = response.valueOf());

    // Refresh dynamiclly page after updating user details
    this.userService.refreshNeeded$
      .subscribe(() => {
        this.getUserDetails(this.username);
      })


    // // Refresh dynamiclly page after updating posts
    // this.userService.refreshNeeded$
    //     .subscribe(() => {
    //       this.getUserDetails(this.username);
    //     })

    // Load user tweets
    this.getPostsByUsername(0);

    // Refresh dynamiclly page after dislike tweet
    // this.postService.refreshNeeded$.subscribe(() => this.getLikedPostsByUsername(0));

    // Load liked tweets by user
    this.getLikedPostsByUsername(0);
  }

  navigateBackToHomePage() {
    this.router.navigateByUrl('/');
  }

  getUserDetails(username: string) {
    this.userService
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.userDetails = userDetails;
          this.userProfilePicture = this.jpgFormat + this.userDetails.userProfilePicture;
          this.userBackgroundPicture = this.jpgFormat + this.userDetails.userBackgroundPicture;
        }, (error) => {
          console.log("Get userdetails in user profile: " + error)
        }
      );
  }

  openEditProfileDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(EditProfileDialogComponent, dialogConfig);
  }

  // When scrolling posts activate this function
  onScrollTweets() {
    if (this.notScrollableTweet && this.notEmptyAnotherTweetPage) {
      this.spinner.show();
      this.notScrollableTweet = false;
      // load next page
      this.getPostsByUsername(this.currentTweetPageNumber++);
    }
  }

  private getPostsByUsername(pageNumber: number) {
    this.postService
      .getPostsByUsername(this.username, pageNumber)
      .subscribe((postResponse) => {
        if (postResponse.length === 0) {
          this.notEmptyAnotherTweetPage = false;
          this.spinner.hide();
        }

        this.postList = [...this.postList, ...postResponse];
        this.notScrollableTweet = true;
      });
  }

  // When scrolling liked posts activate this function
  onScrollLikedTweets() {
    if (this.notScrollableLikedTweet && this.notEmptyAnotherLikedTweetPage) {
      this.spinner.show();
      this.notScrollableLikedTweet = false;
      // load next page
      this.getLikedPostsByUsername(this.currentLikedTweetPageNumber++)
    }
  }

  private getLikedPostsByUsername(pageNumber: number) {
    this.postService
      .getLikedPostsByUsername(this.username, pageNumber)
      .subscribe((postResponse) => {
        if (postResponse.length === 0) {
          this.notEmptyAnotherLikedTweetPage = false;
          this.spinner.hide();
        }

        this.likedPostList = [...this.likedPostList, ...postResponse];
        this.notScrollableLikedTweet = true;
      })
  }

  addUserToConversation() {
    // set conversation request payload
    this.conversationRequestPayload.participantUsername = this.username;
    // send request to message service
    this.messageService
      .addUserToConversation(this.conversationRequestPayload)
      .subscribe(() => console.log("User added to conversation"));
    this.router.navigateByUrl('/messages');
  }

  followUser() {
    this.userService
      .followUser(this.username)
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.FollowUser,
            'OK',
            NotificationType.Success
          );
        }
      )
    this.isUserProfileFollowed = !this.isUserProfileFollowed;
  }

  unfollowUser() {
    this.userService
      .unfollowUser(this.username)
      .subscribe(
        () => {
          this.notificationService.showNotification(
            NotificationMessage.UnfollowUser,
            'OK',
            NotificationType.Success
          );
        }
      )
    this.isUserProfileFollowed = !this.isUserProfileFollowed;
  }

  openFollowingDialog() {
    const dialogConfig = this.passDataToDialog(
      this.userDetails.following,
      this.userDetails.followingNo,
      false,
      "Following"
    );
    this.dialog.open(FollowersDialogComponent, dialogConfig);
  }

  openFollowerDialog() {
    const dialogConfig = this.passDataToDialog(
      this.userDetails.followers,
      this.userDetails.followerNo,
      true,
      "Followers"
    );
    this.dialog.open(FollowersDialogComponent, dialogConfig);
  }

  private passDataToDialog(
    follows: FollowerDto[],
    followsNo: number,
    isFollowerDialogOpened: boolean,
    dialogName: string
  ) {
    var isLoggedUserProfile = false;
    if (this.loggedUser == this.username) {
      isLoggedUserProfile = true;
    }

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      follows: follows,
      followsNo: followsNo,
      isFollowerDialogOpened: isFollowerDialogOpened,
      isLoggedUserProfile: isLoggedUserProfile,
      dialogName: dialogName
    };
    return dialogConfig;
  }

}
