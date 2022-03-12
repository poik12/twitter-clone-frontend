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

  loggedUser!: string;
  username!: string;

  userDetailsResponsePayload!: UserDetailsResponsePayload;
  jpgFormat: string = 'data:image/jpeg;base64,';
  userProfilePicture!: string;
  userBackgroundPicture!: string;

  postList!: PostResponsePayload[];

  isUserProfileFollowed!: boolean;

  conversationRequestPayload: ConversationRequestPayload;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.userDetailsResponsePayload = {
      id: 0,
      username: '',
      name: '',
      createdAt: '',
      tweetNo: 0,
      followingNo: 0,
      followerNo: 0,
      userProfilePicture: 0,
      userBackgroundPicture: 0,
      following: [],
      followers: [],
      likedPosts: []
    }

    this.conversationRequestPayload = {
      participantUsername: ''
    }

  }

  ngOnInit(): void {

    // Get currently logged user
    this.loggedUser = this.authService.getUsernameFromLocalStorage();

    // Get username from activated route http://localhost:4200/profile/:username in sidebar
    this.username = this.activatedRouter.snapshot.params['username'];

    // Check if user if followed
    this.userService
      .checkFollowing(this.loggedUser, this.username)
      .subscribe((response: boolean) => this.isUserProfileFollowed = response.valueOf());

    // Get user details by username from acitvated route
    this.getUserDetails(this.username);

    // Refresh dynamiclly page after updating user details
    this.userService.refreshNeeded$
      .subscribe(() => {
        this.getUserDetails(this.username);
      })

    this.getPostsByUsername(this.username);

    // Refresh dynamiclly page after adding post
    this.postService.refreshNeeded$
      .subscribe(() => {
        this.getLikedPostsByUser()
      })
  }

  navigateBackToHomePage() {
    this.router.navigateByUrl('/');
  }

  getUserDetails(username: string) {
    this.userService
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.userDetailsResponsePayload = userDetails;
          this.userProfilePicture = this.jpgFormat + this.userDetailsResponsePayload.userProfilePicture;
          this.userBackgroundPicture = this.jpgFormat + this.userDetailsResponsePayload.userBackgroundPicture;
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

  getPostsByUsername(username: string) {
    this.postService.getPostByUsername(username)
      .subscribe((postResponse) => {
        this.postList = postResponse;
      })
  }

  startConversation() {
    // set conversation request payload
    this.conversationRequestPayload.participantUsername = this.username;
    // send request to message service
    this.messageService
      .addConversation(this.conversationRequestPayload)
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
      this.userDetailsResponsePayload.following,
      this.userDetailsResponsePayload.followingNo,
      false,
      "Following"
    );
    this.dialog.open(FollowersDialogComponent, dialogConfig);
  }

  openFollowerDialog() {
    const dialogConfig = this.passDataToDialog(
      this.userDetailsResponsePayload.followers,
      this.userDetailsResponsePayload.followerNo,
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


  getLikedPostsByUser() {
    console.log("after refresh liked posts")
    this.postService
      .getLikedPostsForLoggedUser()
      .subscribe((postResponse) => this.userDetailsResponsePayload.likedPosts = postResponse);

  }
}
