import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';
import TweetResponsePayload from 'src/app/models/response-dto/tweet-response.payload';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isLoggedIn!: boolean;
  username!: string;

  // User logged or not - different sidebar
  @Output() userIsLoggedIn!: boolean;

  @Output() searchedTweets: EventEmitter<TweetResponsePayload[]> = new EventEmitter();

  constructor(
    private authService: AuthService,
    public router: Router,
    public progressBarService: ProgressBarService,

  ) { }

  ngOnInit(): void {
    // Check if user is logged in
    const userLoggedIn = this.authService.isUserLoggedIn();

    // Set main page components depending on status of user (is logged or not)
    this.setMainPageComponents(userLoggedIn);

  }

  private setMainPageComponents(userLoggedIn: boolean) {
    if (userLoggedIn) {
      this.userIsLoggedIn = true;
    } else {
      this.userIsLoggedIn = false;
    }
  }
}
