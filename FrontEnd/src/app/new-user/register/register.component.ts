import { Component, OnInit } from '@angular/core';
import { ScrollToTopService } from 'src/app/scroll-to-top.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidataionService } from 'src/app/validataion.service';
import { SavedataService } from 'src/app/savedata.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm : FormGroup;
  hide: boolean = true;

  constructor(private sobj : ScrollToTopService,private fobj : FormBuilder,
    private data : SavedataService,private _snackBar : MatSnackBar) 
  { 
    this.userForm = this.fobj.group({
      'username' : ['',Validators.required],
      'password' : ['',Validators.required],
    })
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;

  }

  ngOnInit(): void {
    this.sobj.scrollToTopOnRouterNavigation();
  }

  Save()
  {
    this.data.NewUserData(this.userForm.value).subscribe((response)=>{
      if(response.auth == true)
      {
        this._snackBar.open('Registration Successfully Done Thank You...!!','Ok');
      }
      else 
      {
        console.log("An Error Occured While Saving Data");
      }
    })
  }
}
