import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SavedataService {

  private _orderDataUrl = "http://localhost:3000/api/orderdata";
  private _userDataUrl = "http://localhost:3000/api/userdata";
  
  /*
  private _consultancyDataUrl = "http://localhost:3000/api/consultancydata";
  private _messageDataUrl = "http://localhost:3000/api/messagedata";
  private _orderDataUrl = "http://localhost:3000/api/orderdata";
  private _userDataUrl = "http://localhost:3000/api/userdata";
  private _resetDataUrl = "http://localhost:3000/api/resetdata";
  */

  constructor(private http : HttpClient) { }

  OrderData(productIds : any[],totalAmount : any)
  {
    const userId = localStorage.getItem('userId');
    const data = {userId,productIds,totalAmount};
    return this.http.post<any>(this._orderDataUrl,data);
  }

  NewUserData(data : any)
  {
    return this.http.post<any>(this._userDataUrl,data);
  }
}
