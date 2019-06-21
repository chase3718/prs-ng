import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  jr: JsonResponse;
  products: Product[];
  title: string = 'Product List';
  //sortCriteria: string = "id";
  sortColumn: string = 'name';
  sortOrder: string = 'asc';
  authenticatedUser = User;

  constructor(private productSvc: ProductService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.products = this.jr.data as Product[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }

  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
      console.log(`sortBy(${col}), order(${this.sortOrder})`);
    }
    this.sortColumn = col;
  }

}
