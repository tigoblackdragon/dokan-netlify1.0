import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const f= inject(NgxSpinnerService);
  f.show('loading');

  return next(req).pipe(finalize(()=>{
    f.hide('loading');  
  }))
  

};
