
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ModelService } from '../model.service';
import { LoginService } from '../login.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogin: boolean = false;
  cartNum:number=0;
  constructor(private _ModelService: ModelService, private _LoginService: LoginService,
    private _CartService:CartService)
   {
    _CartService.numberOfCartItems.subscribe({
      next:(x)=>{
        this.cartNum=x;
      },
      error:(err)=>console.log(err)
    })
    _LoginService.userData.subscribe({
      next: () => {
        if (_LoginService.userData.getValue() !== null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      }
    })
  }


//bridge
  toggleModal(): void {
    this._ModelService.toggleModal();

  }


  logOut(){
    this._LoginService.logOut();
  }

 
}
