import { Component } from '@angular/core';
import {Form,FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {

  cartDetails: any = null;
  shippingAddress:FormGroup =new FormGroup({
details:new FormControl(null),
phone:new FormControl(null),
city:new FormControl(null),
  })

  constructor(private _CartService:CartService){

  }
  handleSubmet(shippingAddress:FormGroup){}

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data,
        console.log(response.data)
      }

      ,
      error: (err) => console.log(err)
    })
  }
}
