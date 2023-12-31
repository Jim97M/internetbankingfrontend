import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.isLoggedIn = true;
    
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          // Redirect to home page or any other route after successful login
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoginFailed = true;
        }
      },
      err => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}