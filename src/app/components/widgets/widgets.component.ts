import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],

})
export class WidgetsComponent implements OnInit {

  footerOptionList = [
    { name: "Terms of use", path: '/home' },
    { name: "Privacy poolicy", path: '/home' },
    { name: "Cookie policy", path: '/home' },
    { name: "Information about advertisements", path: '/home' },
    { name: "More", path: '/home' },
    { name: "© 2021 Twitter, Inc.", path: '/home' },
  ]

  @Input() isUserLoggedIn!: boolean;

  constructor(

  ) { }

  ngOnInit(): void {
    // Depending on whether user is logged or not, show specific widgets
    this.isUserLoggedIn;
  }



}
