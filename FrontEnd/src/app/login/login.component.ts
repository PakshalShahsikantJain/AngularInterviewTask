import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidataionService } from '../validataion.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  hide: boolean = true;

  constructor(private _auth: AuthService,
    private _router: Router,private formBuilder : FormBuilder,private _snackBar : MatSnackBar) 
    { 
      this.loginForm = this.formBuilder.group({
        username : ['',Validators.required],
        password : ['',Validators.required]
      })
    }
   
    
  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  LoginUser() {
    this._auth.loginUser(this.loginForm.value).subscribe((response)=>{
      localStorage.setItem('token',response.token);
      localStorage.setItem('userId',response.userId);
      this._router.navigate(['/home']);
    },(error)=>{
      console.log(error);
      this._snackBar.open("Wrong User Email ID Or Password Please Check and Re-Enter","Ok");
    })
  }
}
