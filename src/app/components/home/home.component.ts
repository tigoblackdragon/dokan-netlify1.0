import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { OwlCarousel } from 'ngx-owl-carousel';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { WhishlistService } from '../../core/services/whishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink, FormsModule, SearchPipe, NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  text: string = '';
  getAllProductSub!: Subscription;
  getAllCategoriesSub!: Subscription;
  maxStars: number = 5;
  ratingPartial: number = 30;
  hasPartialStar: boolean = false;
  partialStarPercentage: number = 0;

  fullStars: number[] = [];
  emptyStars: number[] = [];
  productList: Iproduct[] = [];
  categoriesList: Icategory[] = [];
 


  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService=inject (CartService);
  private readonly _ToastrService=inject (ToastrService);
  private readonly _NgxSpinnerService=inject (NgxSpinnerService);
  private readonly _WhishlistService=inject (WhishlistService);


  staticSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  sliderCategories: OwlOptions = {
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
        items: 1,
      },
      250: {
        items: 2,
      },
      500: {
        items: 3,
      },
      750: {
        items: 4,
      },
      1000: {
        items: 5,
      },
      1250: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
   
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {},
    });


    this.getAllCategoriesSub = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categoriesList = res.data;
          console.log(res.data);
        },
        error: (err) => {},
      });

  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
  }

  // Generates the star array with full, partial, and empty stars
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
    return (this.ratingPartial = 100 - (rating % 1) * 100);
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
