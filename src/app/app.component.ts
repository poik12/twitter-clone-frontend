import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { trigger, transition, group, query, style, animate } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'twitter-clone-frontend';

  constructor(public router: Router) { }

  getDepth(outlet: any) {
    return outlet.ActivatedRouteData['depth'];
  }

}
