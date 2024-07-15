import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  
  private _accessUrl = "http://localhost:3000/api/access";
  private _cartUrl = "http://localhost:3000/api/cart";
  private _accessCartUrl = "http://localhost:3000/api/cartitems";
  private _DeleteCartItemUrl = "http://localhost:3000/api/deleteitem";

  constructor(private http : HttpClient) {}
  
  addToCart(productId: any) : Observable<any> {
    const userId = localStorage.getItem('userId');
    const data = {userId,productId};    

    return this.http.post<any>(this._cartUrl,data);
  }

  getCartItems()
  {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this._accessCartUrl}/${userId}`);
  }
  
  ItemsData() {
    return this.http.get<any>(this._accessUrl);
  }

  DeleteCartItem(productId : any) : Observable<any> {
    const userId = localStorage.getItem('userId');
    const data = {userId,productId};    
    console.log(data);
    return this.http.post<any>(this._DeleteCartItemUrl,data)
  }
}
