import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component'
import { RegisterComponent } from '../auth/register/register.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [LoginComponent, RegisterComponent],
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    private loginComponent: LoginComponent,
    private registerComponent: RegisterComponent
  ) { }

  ngOnInit(): void {
  }

  // After click sign IN button in footer
  goToSignInPage() {
    this.router.navigateByUrl("/login");
    this.loginComponent.openSignInDialog();
  }

  // After click sign UP button in footer
  goToSignUpPage() {
    this.router.navigateByUrl("/login");
    this.registerComponent.openSignUpDialog();
  }


}
