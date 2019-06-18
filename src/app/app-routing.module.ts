import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { AboutComponent } from './core/about/about.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { PrListComponent } from './feature/pr/pr-list/pr-list.component';
import { PrliListComponent } from './feature/prli/prli-list/prli-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/list', pathMatch: 'full' },

  { path: 'user/list', component: UserListComponent },
  { path: 'user/create', component: UserCreateComponent},

  { path: 'vendor/list', component: VendorListComponent },

  { path: 'product/list', component: ProductListComponent },

  { path: 'pr/list', component: PrListComponent },

  { path: 'prli/list', component: PrliListComponent},

  { path: 'about', component: AboutComponent},

  { path: '**', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
