import { Component, OnInit } from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  footerOptionList = [
    { name: "About", path: "/" },
    { name: "Help Center", path: "/" },
    { name: "Terms of Service", path: "/" },
    { name: "Privacy Policy", path: "/" },
    { name: "Cookie Policy", path: "/" },
    { name: "Ads info", path: "/" },
    { name: "Blog", path: "/" },
    { name: "Status", path: "/" },
    { name: "Careers", path: "/" },
    { name: "Brand Resources", path: "/" },
    { name: "Advertising", path: "/" },
    { name: "Marketing", path: "/" },
    { name: "Twitter for Business", path: "/" },
    { name: "Developers", path: "/" },
    { name: "Directory", path: "/" },
    { name: "Settings", path: "/" },
    { name: "© 2021 Twitter, Inc.", path: "/" },
  ]

  twitterIcon = faTwitter;

  isLoginSection!: boolean;

  constructor() {
    this.isLoginSection = false; // Default property, user will see Login Component on Login Page
  }

  ngOnInit(): void {

  }

  changeBetweenLoginAndRegisterSection = () => {
    if (this.isLoginSection) {
      this.isLoginSection = false;
    } else {
      this.isLoginSection = true;
    }
  };

}
