import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  jr: JsonResponse;
  vendorIdStr: string;
  vendor: Vendor;
  products: Product[];
  title: string = 'Vendor Detail';

  constructor(private vendorSvc: VendorService,
              private productSvc: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.vendorIdStr = params['id']);
    this.vendorSvc.get(this.vendorIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendor = this.jr.data as Vendor;
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
    this.productSvc.getFromVendor(this.vendorIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.products = this.jr.data as Product[];
          console.log("f", this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    )
  }

  remove() {
    this.vendorSvc.delete(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        console.log('gud');
        this.router.navigate(['/vendor/list']);
        alert('Vendor Deleted succesfuly');
      }
    )
  }
}
