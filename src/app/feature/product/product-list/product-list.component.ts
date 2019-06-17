import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { JsonResponse } from 'src/app/model/json-response.class';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  jr: JsonResponse;
  products: Product[];
  title: string = 'Product List';

  constructor(private productSvc: ProductService) { }

  ngOnInit() {
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


}
