import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { WhishlistService } from '../../core/services/whishlist.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Icategory } from '../../core/interfaces/icategory';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchPipe, NgxSpinnerModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy {
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
