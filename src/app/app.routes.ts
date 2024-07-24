import { Routes } from '@angular/router';
import {HomeViewComponent} from "./public/pages/home-view/home-view.component";
import {LoginComponent} from "./iam/pages/login/login.component";
import {RegisterUserComponent} from "./iam/components/register-user/register-user.component";
import {ShoppingContentComponent} from "./management/components/shopping-content/shopping-content.component";
import {ProductHomeContentComponent} from "./management/components/product-home-content/product-home-content.component";
import {AdminViewComponent} from "./management/pages/admin-view/admin-view.component";
import {UserViewComponent} from "./management/pages/user-view/user-view.component";
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',component: HomeViewComponent},
  {path:'login',component: LoginComponent},
  {path:'registro',component: RegisterUserComponent},
  {path:'carrito',component:ShoppingContentComponent},
  {path:'producto_home',component:ProductHomeContentComponent},
  {path:"admin/view",component:AdminViewComponent},
  {path:"user/view",component:UserViewComponent},

];
