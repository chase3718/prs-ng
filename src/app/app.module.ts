import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserService } from './service/user.service';
import { MenuComponent } from './core/menu/menu.component';
import { AboutComponent } from './core/about/about.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { PrListComponent } from './feature/pr/pr-list/pr-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { PrCreateComponent } from './feature/pr/pr-create/pr-create.component';
import { PrDetailComponent } from './feature/pr/pr-detail/pr-detail.component';
import { PrEditComponent } from './feature/pr/pr-edit/pr-edit.component';
import { SortPipe } from './pipe/sort.pipe';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { PrLinesComponent } from './feature/pr/pr-lines/pr-lines.component';
import { PrliCreateComponent } from './feature/prli/prli-create/prli-create.component';
import { PrliEditComponent } from './feature/prli/prli-edit/prli-edit.component';
import { PrReviewComponent } from './feature/pr/pr-review/pr-review.component';
import { PrApproveComponent } from './feature/pr/pr-approve/pr-approve.component';
import { HomeComponent } from './core/home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { RerouteComponent } from './core/reroute/reroute.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MenuComponent,
    AboutComponent,
    VendorListComponent,
    ProductListComponent,
    PrListComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserEditComponent,
    VendorCreateComponent,
    VendorDetailComponent,
    VendorEditComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
    PrCreateComponent,
    PrDetailComponent,
    PrEditComponent,
    SortPipe,
    UserLoginComponent,
    PrLinesComponent,
    PrliCreateComponent,
    PrliEditComponent,
    PrReviewComponent,
    PrApproveComponent,
    HomeComponent,
    FooterComponent,
    RerouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
