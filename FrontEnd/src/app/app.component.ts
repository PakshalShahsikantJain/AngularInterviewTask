import { Component } from '@angular/core';
import { ShareDataService } from './share-data.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { WeatherService } from './wetherdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed: boolean = false;
  cartCount : number = 0;
  weatherData: any;

  constructor(public loadingService: LoadingService,private sobj : ShareDataService,private _authService : AuthService,private _router : Router
    ,private weatherService: WeatherService
  ) {
    this.checkWidth();
      
    window.addEventListener('resize', () => {
      this.checkWidth();
    });
  }

  ngOnInit(): void {
  }
  
  checkWidth() {
    this.isCollapsed = window.innerWidth <= 600; 
  }

  isLoggedIn(): any {
    return this._authService.loggedIn();
  }

  LogIn() 
  {
    this._router.navigate(['/login']);
  }
  
  LogOut() 
  {
    this._authService.logoutUser();
    this.cartCount = 0;
    console.log("Logged Out Successfully");
  }
}
