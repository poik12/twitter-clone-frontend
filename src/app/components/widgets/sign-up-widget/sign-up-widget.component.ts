import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { RegisterComponent } from '../../auth/register/register.component';


@Component({
  selector: 'app-sign-up-widget',
  templateUrl: './sign-up-widget.component.html',
  styleUrls: ['./sign-up-widget.component.css'],
  providers: [RegisterComponent],
})
export class SignUpWidgetComponent implements OnInit {

  appleIcon = faApple;
  googleIcon = faGoogle;

  constructor(
    private router: Router,
    private registerComponent: RegisterComponent
  ) { }

  ngOnInit(): void {
  }

  // After click sign UP button in sign up block
  goToSignUpPage() {
    this.router.navigateByUrl("/login");
    this.registerComponent.openSignUpDialog();
  }

}
