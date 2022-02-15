
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.css']
})
export class ProfileBlockComponent implements OnInit {

  @Input() username!: string;

  name!: string;
  profileImage!: string;
  jpgFormat: string = 'data:image/jpeg;base64,';
  description!: number;
  followersNo!: number;
  followingNo!: number;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserDetails(this.username);
  }

  getUserDetails(username: string) {
    this.authService
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.name = userDetails.name;
          this.username = userDetails.username;
          this.profileImage = this.jpgFormat + userDetails.userProfilePicture;
          this.description = userDetails.tweetsNo;
          this.followersNo = userDetails.followersNo;
          this.followingNo = userDetails.followingNo;
        })
  }
}

