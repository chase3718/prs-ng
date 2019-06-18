import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { AboutComponent } from './core/about/about.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { PrListComponent } from './feature/pr/pr-list/pr-list.component';
import { PrliListComponent } from './feature/prli/prli-list/prli-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/list', pathMatch: 'full' },

  { path: 'user/list', component: UserListComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'user/remove/:id', component: UserDetailComponent },

  { path: 'vendor/list', component: VendorListComponent },
  { path: 'vendor/create', component: VendorCreateComponent},
  { path: 'vendor/edit/:id', component: VendorEditComponent},
  { path: 'vendor/detail/:id', component: VendorDetailComponent},
  { path: 'vendor/remove/:id', component: VendorDetailComponent},

  { path: 'product/list', component: ProductListComponent },
  { path: 'product/create', component: ProductCreateComponent},
  { path: 'product/edit/:id', component: ProductEditComponent},
  { path: 'product/detail/:id', component: ProductDetailComponent},
  { path: 'product/remove/:id', component: ProductDetailComponent},

  { path: 'pr/list', component: PrListComponent },

  { path: 'prli/list', component: PrliListComponent },

  { path: 'about', component: AboutComponent },

  { path: '**', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
