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
import { PrliListComponent } from './feature/prli/prli-list/prli-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MenuComponent,
    AboutComponent,
    VendorListComponent,
    ProductListComponent,
    PrListComponent,
    PrliListComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserEditComponent
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
