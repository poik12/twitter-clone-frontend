import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-may-like-widget',
  templateUrl: './may-like-widget.component.html',
  styleUrls: ['./may-like-widget.component.css']
})
export class MayLikeWidgetComponent implements OnInit {

  verifiedIcon = faCheck;

  constructor() { }

  ngOnInit(): void {
  }

}
