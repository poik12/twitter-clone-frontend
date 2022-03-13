import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  // if true then start loading new page
  @Input('notEmptyPage') notEmptyPage: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
