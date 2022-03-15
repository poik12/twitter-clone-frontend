import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() isTweetReplied: boolean = false;
  @Input() repliedUser: string = '';

  @Output() public handleDeleteComment: EventEmitter<any> = new EventEmitter<any>()

  profileImage!: string;
  jpgFormat: string = 'data:image/jpeg;base64,';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.profileImage = this.jpgFormat + this.comment.profileImage;
  }

}
