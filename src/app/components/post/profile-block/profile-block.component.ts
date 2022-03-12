
import { Component, Input, OnInit } from '@angular/core';
import FollowerDto from 'src/app/models/response-dto/follower-response.payload';
import { UserService } from 'src/app/services/user/user.service';

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
  followerNo!: number;
  followingNo!: number;
  following!: Array<FollowerDto>;
  followers!: Array<FollowerDto>;

  constructor(
    private userSerivce: UserService
  ) { }

  ngOnInit(): void {
    this.getUserDetails(this.username);
  }

  getUserDetails(username: string) {
    this.userSerivce
      .getUserByUsername(username)
      .subscribe(
        (userDetails) => {
          this.name = userDetails.name;
          this.username = userDetails.username;
          this.profileImage = this.jpgFormat + userDetails.userProfilePicture;
          this.description = userDetails.tweetNo;
          this.followerNo = userDetails.followerNo;
          this.followingNo = userDetails.followingNo;
          this.following = userDetails.following;
          this.followers = userDetails.followers;
        })
  }
}

