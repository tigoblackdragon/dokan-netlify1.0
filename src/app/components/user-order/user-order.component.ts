import { Component, inject, OnInit } from '@angular/core';
import { Iorders } from '../../core/interfaces/iorders';
import { OrdersService } from '../../core/services/orders.service';
import { CartService } from '../../core/services/cart.service';
import { Imyorder } from '../../core/interfaces/imyorder';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-order',
  standalone: true,
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css'
})
export class UserOrderComponent  implements OnInit{

  private readonly _OrdersService=inject (OrdersService)
  private readonly _CartService=inject(CartService)
  myOrdersDetails: Imyorder[]= [];
  id:string='';
  id2:string='';
  id3:string='';
  cartOrders:number=0;
  
    ngOnInit(): void {
      this._CartService.cartId.subscribe({
        next:(d)=>{
          this.id=d;   
          console.log(this.id)
            }
      })
  
      this.id2=this._CartService.getData();
      console.log('Shared Data:',this.id2)
  
  
  ///to get user order by id
    //  const storedId = localStorage.getItem('cartId');
     
      this.id3='6407cf6f515bdcf347c09f17';
      this._OrdersService.getUserOrders(this.id3).subscribe({
        next: (res) => 
        {console.log(res);
          this.myOrdersDetails=res
        this._CartService.cartOrders.next(res.length);

        localStorage.setItem("cartOrders",res.length);
        }
        ,
        error: (err) => console.error(err)
      }) 
  }}
  