
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToasterService } from '../toaster.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails: any = null;
  constructor(private _CartService: CartService,
    private _ToasterService: ToasterService
  ) { }
  showSuccessToast() {
    this._ToasterService.showSuccess('the quantity has been increased');
    console.log("k")
  }

  showErrorToast() {
    this._ToasterService.showError('the quantity has been decreased');
  }



  removeItem(productId: string) {
    this._CartService.deleteSpaItem(productId).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        console.log(response.data)
      },
      error: (err) => console.log(err)


    })
  }


  updateCount(productId: string, count: number) {
    this._CartService.updateCount(productId, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data;

      },
      error: (err) => console.log(err)
    })
  }

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
