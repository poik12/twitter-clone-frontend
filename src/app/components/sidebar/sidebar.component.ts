import { Component, Input, OnInit } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome, faHashtag, faBell, faEnvelope, faBookmark, faList, faUser, faEllipsisH, faCog } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationMessage } from 'src/app/services/notification/notification-message.enum';
import { NotificationType } from 'src/app/services/notification/notification-type.enum';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() isUserLoggedIn!: boolean;

  // User parameters in sidebar
  username!: string;
  name!: string;
  profileImage!: string;
  jpgFormat: string = 'data:image/jpeg;base64,';

  sidebarOptionListForUser = [
    { name: 'Home', icon: faHome, path: "/" },
    { name: 'Explore', icon: faHashtag, path: "/explore" },
    { name: 'Notifications', icon: faBell, path: "/notifications" },
    { name: 'Messages', icon: faEnvelope, path: "/messages" },
    { name: 'Bookmarks', icon: faBookmark, path: "/bookmark" },
    { name: 'Lists', icon: faList, path: "/lists" },
    { name: 'Profile', icon: faUser, path: "/profile/" + this.authService.getUsernameFromLocalStorage() },
    { name: 'More', icon: faEllipsisH, path: "/more" },
  ];

  sidebarOptionListForStranger = [
    { name: 'Explore', icon: faHashtag, path: "/explore" },
    { name: 'Settings', icon: faCog, path: "/settings" },
  ];

  // Icon
  twitterIcon = faTwitter;
  moreIcon = faEllipsisH;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationSerivce: NotificationService,
    private userSerivce: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn;

    this.username = this.authService.getUsernameFromLocalStorage();
    this.getUserDetails(this.username);
  }

  logout() {
    this.authService.logout();
    this.notificationSerivce.showNotification(
      NotificationMessage.Logout,
      'OK',
      NotificationType.Success
    );
  }

  getUserDetails(username: string) {
    this.userSerivce
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.name = userDetails.name;
          this.profileImage = this.jpgFormat + userDetails.userProfilePicture;
        },
        (error) => {
          console.log(error);
        })
  }

}
