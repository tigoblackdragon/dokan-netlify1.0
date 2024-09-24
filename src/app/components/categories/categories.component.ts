import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ɵinjectChangeDetectorRef } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { IcatPag } from '../../core/interfaces/icat-pag';
import { IcatSub } from '../../core/interfaces/icat-sub';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  constructor(private cdr: ChangeDetectorRef) {} 
  categDetails:IcatPag={} as IcatPag;
  subCategoriesList:IcatSub ={} as IcatSub;

private readonly _CategoriesService=inject(CategoriesService);


  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next: (res) => {
          this.categDetails=res;
          console.log(res);
          
        },
        error: (error) => console.log(error)
      })
  }

  scrollToSubCategory(id: string): void {
    this._CategoriesService.getSpecificCategory(id).subscribe({
      next: (res:any) => {
        this.subCategoriesList=res
        console.log(res);
        const element = document.getElementById('subCategoriesSection'); // Get the target element
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the element
    };
      },
      error: (error) => console.log(error)
    })
    

  }




}
