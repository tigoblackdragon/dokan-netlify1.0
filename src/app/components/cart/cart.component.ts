import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{


  private readonly _CartService=inject (CartService);
  private readonly _ToastrService=inject (ToastrService);

  cartDetails: icart ={} as icart;
isLoading:boolean=false;
countNumber: number=0;

  ngOnInit(): void {
      this._CartService.getCartItems().subscribe({
        next: (res) => {
          this.cartDetails=res.data;
          console.log(res);
          this.countNumber =res.numOfCartItems;
          
        },
        error: (err) => {console.error(err)}
      })
    
     }
  

  

 




removeProduct(id:string){
  this._CartService.deleteSpecificProduct(id).subscribe({
    next: (par) => {
      this.cartDetails=par.data;
      this._CartService.cartNumber.next(par.numOfCartItems);
      this.countNumber =par.numOfCartItems;
      console.log(id)
      
      // this._ToastrService.error(par.status, "Product Deleted");
      
    },
    error: (err)=> {},
})

}
updateQuantity(id:string,count:number){
  if(count>0){
    this._CartService.updateProductCount(id,count).subscribe({
      next: (res) => {
        this.cartDetails=res.data;
      },
      error: (err)=> {},
  })
  }
  else{
    this.removeProduct(id);
    
  }
  
}

clearCartBtn():void{
  this._CartService.clearCart().subscribe({
    next: (res) => {
      console.log(res);
      if(res.message=='success'){
this.cartDetails={} as icart;
this._ToastrService.error(res.message,"clearCart")
this._CartService.cartNumber.next(0)
this.cartDetails.totalCartPrice=0;
this.countNumber =0

      }
    },
    error: (err)=> {},
})
}


}