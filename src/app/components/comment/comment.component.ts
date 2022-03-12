import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import CommentResponsePayload from 'src/app/models/response-dto/comment-response.payload';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  moreIcon = faEllipsisH;
  verifiedIcon = faCheck;

  @Input() comment!: CommentResponsePayload;

  profileImage!: string;
  jpgFormat: string = 'data:image/jpeg;base64,';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.profileImage = this.jpgFormat + this.comment.profileImage;
  }

}
