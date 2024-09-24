import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { UserOrderComponent } from './components/user-order/user-order.component'

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,canActivate:[logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full',title:'login' },
      { path: 'login', component: LoginComponent,title:'login' },
      { path: 'register', component: RegisterComponent,title:'Register' },
      { path: 'forgotPassword', component: ForgotpassComponent,title:'Forgot The Password' },
    ],

  },
  {
    path: '',
    component: BlankLayoutComponent,canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent,title:'DOKAN' },
      { path: 'product', component: ProductComponent,title:'Products' },
      { path: 'cart', component: CartComponent,title:'Cart' },
      { path: 'brands', component: BrandsComponent,title:'Brands' },
      { path: 'categories', component: CategoriesComponent,title:'Categories' },
      { path: 'details/:data', component: DetailsComponent,title:'Product Details' },
      { path: 'whishlist', component: WhishlistComponent,title:'Whish List' },
      { path: 'allorders', component: AllordersComponent,title:'All Orders' },
      { path: 'userorders', component: UserOrderComponent,title:'User Orders' },
      { path: 'orders/:id', component: OrdersComponent,title:'Orders' },
      { path: '**', component: NotfoundComponent,title:'Error'},
      { path: 'orders/:id', component: OrdersComponent,title:'Orders' },
      { path: '**', component: NotfoundComponent,title:'Error'},
    ],
  },
  { path: '**', component: NotfoundComponent,title:'Error'},
];
