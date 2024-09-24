import { Component, inject, NgModule, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit{

  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _OrdersService= inject(OrdersService)
  private readonly _CartService=inject(CartService)

  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });


  idCart:string|null=""
  isLoading:boolean=false;
status:string=''

ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next: (pMap) => {
   this.idCart=pMap.get('id');
   console.log(this.idCart)
   if (this.idCart) {
    this._CartService.cartId.next(this.idCart); // Update BehaviorSubject
    this._CartService.setData(this.idCart);     // Save data in service
    localStorage.setItem('cartId', this.idCart);
    console.log('Component 1 - ID saved in localStorage:', this.idCart);
    // Log after saving the data
    console.log('Saved ID in service:', this._CartService.getData());
  } else {
    console.error('No ID found in route');
  }
  }
 });
 

}


  orderSubmit(){
    this._OrdersService.creatCashOrder(this.idCart, this.orders.value).subscribe({
      next: (res) => { 
        this.status=res.status;
        console.log(this.status)
      }})

      
this._OrdersService.checkOut(this.idCart, this.orders.value).subscribe({
  next: (res) => {
    console.log(res);
    this.isLoading=true;
    if(res.status==='success'){
      
      setTimeout(() => {
        this.isLoading=false;
        res.session.url;
        window.open(res.session.url,'_self')
      }, 5000);
    }
  },
  error: (err) => {
    console.error(err);
  }
 })

}}