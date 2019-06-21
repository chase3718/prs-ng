import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  jr: JsonResponse;
  productIdStr: string;
  product: Product;
  title: string = 'Product Edit';
  vendors: Vendor[];

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.route.params.subscribe(params => this.productIdStr = params['id']);
    this.productSvc.get(this.productIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.product = this.jr.data as Product;
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
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

  edit() {
    this.productSvc.update(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/product/list']);
          alert('Product Updated succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to update product');
        }
      }
    )
  }
}
