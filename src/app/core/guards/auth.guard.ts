import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const _Route= inject (Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);
if(isPlatformBrowser(_PLATFORM_ID)){
  if(localStorage.getItem('userToken')!==null){
    return true;
      } else {
        _Route.navigate(['/login']);
        return false;
        
      }
}
  else {
    return false;
  }
  }

