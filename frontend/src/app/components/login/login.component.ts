import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

  browseAsAnonymous(): void {
    this.authService.removeToken();
    this.router.navigate(['/home']);
  }
}
