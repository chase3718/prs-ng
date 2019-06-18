import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  title: string = 'Product Create';
  jr: JsonResponse;
  product: Product = new Product();
  vendors: Vendor[];

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendors = this.jr.data as Vendor[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    )
  }

  create() {
    this.product.photoPath = '/images/' + this.product.photoPath;
    this.productSvc.create(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/product/list']);
          alert('Product created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create product');
        }
      }
    )
  }

}
