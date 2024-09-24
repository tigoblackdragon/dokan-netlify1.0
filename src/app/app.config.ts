import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgbScrollSpyConfig } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(),withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', 
      anchorScrolling: 'enabled',              
    })),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorsInterceptor, loadingInterceptor])),
    RouterModule,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule)
  ],
};
