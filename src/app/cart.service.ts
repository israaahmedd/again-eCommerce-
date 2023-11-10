import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
headers:any={
  token:localStorage.getItem('userToken')
}
  constructor(private _HttpClient:HttpClient) { }

  addToCart(productId:string):Observable <any>{
    return this._HttpClient.post (`https://ecommerce.routemisr.com/api/v1/cart`
    ,{productId:productId},{headers:this.headers}
    )
  }

  getLoggedUserCart(): Observable<any>{
 return this._HttpClient.get (`https://ecommerce.routemisr.com/api/v1/cart`
,{headers:this.headers}
    )
  }

deleteSpaItem(productId:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
  {headers:this.headers})
}
updateCount(productId:string,count:number):Observable<any>{
  return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
  {
    count: count
},
  {headers:this.headers})
}

onlinePayment(shippingAddress:any,cartId:string):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, 
  {
    
      shippingAddress:shippingAddress
      
  
},
  {headers:this.headers})
}


}
