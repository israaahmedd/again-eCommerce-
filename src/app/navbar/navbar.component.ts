
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ModelService } from '../model.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogin: boolean = false;
  constructor(private _ModelService: ModelService, private _LoginService: LoginService)
   {
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
