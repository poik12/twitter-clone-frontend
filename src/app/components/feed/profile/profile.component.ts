import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeft, faCalendar, faBell, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import PostResponsePayload from 'src/app/models/post-response.payload';
import UserDetailsResponsePayload from 'src/app/models/user-details-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';

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

  userDetailsResponsePayload !: UserDetailsResponsePayload;
  jpgFormat: string = 'data:image/jpeg;base64,';
  userProfilePicture!: string;
  userBackgroundPicture!: string;

  postList!: PostResponsePayload[];


  isUserProfileFollowed!: boolean;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private postService: PostService
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getUsernameFromLocalStorage();

    // Get username from activated route http://localhost:4200/profile/:username in sidebar
    this.username = this.activatedRouter.snapshot.params['username'];
    // Get user details by username from acitvated route
    this.getUserDetails(this.username);

    // Refresh dynamiclly page after updating user details
    this.authService.refreshNeeded$
      .subscribe(() => {
        this.getUserDetails(this.username);
      })

    this.getPostsByUsername(this.username);
  }

  // user = {
  //   name: "Jason Hudson",
  //   username: "j_hudson1976",
  //   email: "jhudson@gmail.com",
  //   password: secret_password,
  //   telephoneNumber: 49959993,
  //   imageUrl: "",
  //   backgroundImageUrl: "",
  //   description: "Call of Duty Black ops 2",
  //   createdAt: "August 2014",
  //   following: "235", // array.length
  //   followers: "96", // array.length
  //   tweets: "349", // array.length
  //   comments: "43" // array.length
  // }

  navigateBackToHomePage() {
    this.router.navigateByUrl('/');
  }

  getUserDetails(username: string) {
    this.authService
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

  addFollowedUser() {
    // this.authService.followUserProfile();
    console.log("clicked")
    this.isUserProfileFollowed = !this.isUserProfileFollowed;
  }

}
