import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import { AppComponent } from '../app.component';
import { ScrollToTopService } from '../scroll-to-top.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';
import { SavedataService } from '../savedata.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  cartItem : any[] = [];
  productId : any[] = []; 
  subtotal: number = 0;
 
  constructor(private _router : Router,private sobj : ShareDataService,private save : SavedataService,
    private aobj : AppComponent,private scroll : ScrollToTopService,private loading : LoadingService,private _snackBar : MatSnackBar) 
  { }


  ngOnInit(): void {
    this.loading.setLoadingState(true);

    this.scroll.scrollToTopOnRouterNavigation();
    
    this.sobj.getCartItems().subscribe((response)=> {
      this.cartItem = response;
      console.log(this.cartItem)
      this.aobj.cartCount = this.cartItem.length;
      this.calculateSubtotal();
      
      this.loading.setLoadingState(false);
    },(error)=>{
      if( error instanceof HttpErrorResponse ) {
        if (error.status === 401) {
          this._router.navigate(['/login'])
        }
      }
    })
  }

  calculateSubtotal() {
    this.subtotal = this.cartItem.reduce((acc, item) => acc + item.price, 0);
  }

  PlaceOrder() {
    var i : number = 0;
    for(i = 0;i < this.cartItem.length;i++) 
    {
      this.productId.push(this.cartItem[i]);
    }

    console.log(this.productId);

    this.save.OrderData(this.productId,this.subtotal).subscribe((response)=>{
      console.log("order Received",response);
      this._snackBar.open('Order Received Thank You For Shopping with us...!!','Ok');
    });
  }

  Delete(value : any)
  {
    console.log(value);

    if (confirm('Are you sure you want to Delete ?')) 
    {
      this.sobj.DeleteCartItem(value).subscribe((response)=> {
        this.cartItem = response;
        this.aobj.cartCount = this.cartItem.length;
        this.calculateSubtotal();
      })
    }
    this.calculateSubtotal();
  }
}
