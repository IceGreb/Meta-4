import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  currentDate: string;

  constructor(private router: Router) {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  }
  
  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  

  isLoggedIn(): boolean {
    
    return !!localStorage.getItem('token');
  }
  
  

  logout() {
    
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
}
