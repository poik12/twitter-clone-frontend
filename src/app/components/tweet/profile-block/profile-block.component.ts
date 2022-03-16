
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

  userBlock = {
    name: '',
    username: '',
    profileImage: '',
    description: '',
    followerNo: 0,
    followingNo: 0,

  }
  jpgFormat: string = 'data:image/jpeg;base64,';

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
          this.userBlock.name = userDetails.name;
          this.userBlock.username = userDetails.username;
          this.userBlock.profileImage = this.jpgFormat + userDetails.userProfilePicture;
          this.userBlock.followerNo = userDetails.followerNo;
          this.userBlock.followingNo = userDetails.followingNo;

          this.userBlock.description = userDetails.description;
          if (this.userBlock.description.length > 150) {
            this.userBlock.description = this.userBlock.description.substring(0, 150) + "...";
          }

        })
  }
}

