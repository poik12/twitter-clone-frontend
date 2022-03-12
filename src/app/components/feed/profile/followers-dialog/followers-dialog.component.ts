import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import FollowerDto from 'src/app/models/response-dto/follower-response.payload';
import UserDetailsResponsePayload from 'src/app/models/response-dto/user-details-response.payload';

@Component({
  selector: 'app-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.css', '../../../auth/auth.component.css']
})
export class FollowersDialogComponent implements OnInit {

  twitterIcon = faTwitter;
  verifiedIcon = faCheck;

  // Wherter it is opened Follower or Following Dialog
  follows!: Array<FollowerDto>
  followsNo!: number;
  isFollowerDialogOpened!: boolean;
  isLoggedUserProfile!: boolean;
  dialogName!: string;

  jpgFormat: string = 'data:image/jpeg;base64,';

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.follows = data.follows;
    this.followsNo = data.followsNo;
    this.isFollowerDialogOpened = data.isFollowerDialogOpened;
    this.isLoggedUserProfile = data.isLoggedUserProfile;
    this.dialogName = data.dialogName;
  }

  ngOnInit(): void {

  }

  closeFollowersDialog() {
    this.dialogRef.close();
  }

}
