import { Subcategory } from './../../core/interfaces/iproduct';
import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';
import { IcatSub } from '../../core/interfaces/icat-sub';
import { IsubBrand } from '../../core/interfaces/isub-brand';
import { NgbConfig, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import bootstrap from '../../../main.server';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink, NgbModalModule,CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{

  private readonly _BrandsService= inject(BrandsService);
brandsDetails:Ibrands={}as Ibrands;
SubBrand:IsubBrand={}as IsubBrand;

  ngOnInit(): void {
      this._BrandsService.getAllBrands().subscribe({
next:(res)=>{
  this.brandsDetails=res;
  console.log(res);

}
      })}

selectBrand(id:string){
  this._BrandsService.getSpecBrand(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.SubBrand=res;
      this.openModal();
}})
}

openModal(): void {
  const modelDiv=document.getElementById('staticBackdrop');
  if(modelDiv!=null){
modelDiv.style.display='block';
  }}
  closeModal(): void {
    const modelDiv=document.getElementById('staticBackdrop');
    if(modelDiv!=null){
  modelDiv.style.display='none';
    }}
}

