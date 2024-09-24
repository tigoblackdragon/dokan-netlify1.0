import { WhishlistService } from './../../core/services/whishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iwhish } from '../../core/interfaces/iwhish';
import { pipe } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.css'
})
export class WhishlistComponent implements OnInit{




  private readonly _WhishlistService=inject (WhishlistService);
  private readonly _ToastrService=inject (ToastrService);
  private readonly _CartService=inject (CartService);


  whishDetails: Iwhish ={} as Iwhish;
isLoading:boolean=false;

  ngOnInit(): void {
      this._WhishlistService.getWhishItems().subscribe({
        next: (res) => {
          this.whishDetails=res;
          console.log(res)
        },
        error: (err) => {console.error(err)}
      })
  }

removeProduct(id:string){
  this._WhishlistService.deleteSpecificProduct(id).subscribe({
    next: (res) => {
      this._ToastrService.error(res.message, "Product Deleted");
      this._WhishlistService.getWhishItems().subscribe({
        next: (res) => {
          this.whishDetails=res;
          console.log(res)
        } })
    },
    error: (err)=> {},

})
}

addToCart(id:string): void {
  this._CartService.addToCart(id).subscribe ({
    next: (res) => {
      console.log('res');
      this._ToastrService.success(res.message," Dokan")
      this._CartService.cartNumber.next(res.numOfCartItems); 
     this.removeProduct(id);
    },
    error: (err) => {
      console.error( err);
    }
  })
}


}
