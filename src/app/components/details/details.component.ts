import { ProductComponent } from './../product/product.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../core/services/whishlist.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{


  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    center: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }


  productDetails:Iproduct={} as Iproduct;

  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _ProductsService= inject(ProductsService)
  private readonly _CartService= inject(CartService)
  private readonly _ToastrService= inject(ToastrService)
  private readonly _WhishlistService= inject(WhishlistService)
  


  maxStars: number = 5;
  ratingPartial:number=30;
  fullStars: number[] = [];
  emptyStars: number[] = [];
  hasPartialStar: boolean = false;
  partialStarPercentage: number = 0;

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next: (pMap) => {
         let idProduct=pMap.get('data');
         console.log(pMap.get('data'));
         this._ProductsService.getProductById(idProduct).subscribe({
          next: (res) => {
            this.productDetails=res.data;
            console.log(res.data);
          },
          error: (err) => console.error(err)
        })
        },
        error: (err) => console.error(err)
      })
      
  }
  generateStars(rating: number): string[] {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasPartialStar = rating % 1 !== 0; // True if there is a fractional part
    const emptyStars = this.maxStars - fullStars - (hasPartialStar ? 1 : 0); // Remaining empty stars

    const starsArray: string[] = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push('full');
      console.log(starsArray);
    }

    // Add partial star if there is a fraction
    if (hasPartialStar) {
      starsArray.push('partial');
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push('empty');
    }
    return starsArray;
  }

  // Get the percentage of the last star fill based on the decimal value of the rating
  getFractionFill(rating: number): number {
    // Convert the decimal part to a percentage (e.g., 0.3 -> 30%)
    return this.ratingPartial=100-(rating % 1) * 100;
  }


  addToCart(id:string): void {
    this._CartService.addToCart(id).subscribe ({
      next: (res) => {
        console.log('res');
        this._ToastrService.success(res.message," Dokan")
        this._CartService.cartNumber.next(res.numOfCartItems); 
      },
      error: (err) => {
        console.error( err);
      }
    })
  }
  
  addToWish(id:string): void {
    this._WhishlistService.addToWhish(id).subscribe ({
      next: (res) => {
        console.log('res');
        this._ToastrService.success(res.message," Dokan")
      },
      error: (err) => {
        console.error( err);
      }
    })
  }
}
