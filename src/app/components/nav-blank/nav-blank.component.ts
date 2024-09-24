import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {
  private readonly _AuthService= inject(AuthService)
  private readonly _CartService = inject(CartService)

  countNumber: number=0;
  ordersNumber:any;
  ordersAdminNumber:any;


  ngOnInit(): void {

    this._CartService.getCartItems().subscribe({
      next:(res)=>{
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    })

  this.ordersNumber=localStorage.getItem("cartOrders");
  this.ordersAdminNumber=localStorage.getItem("adminOrders");

     this._CartService.cartNumber.subscribe({
      next:(d)=>{
this.countNumber=d;
      }
     })

//      this._CartService.cartOrders.subscribe({
//       next:(e)=>{
// this.ordersNumber=e;
//       }
//      })
//      this._CartService.adminOrders.subscribe({
//       next:(r)=>{
// this.ordersAdminNumber=r;
//       }
//     })


    } 

  isLoggedout():void{
    this._AuthService.logOut();
  };

}
