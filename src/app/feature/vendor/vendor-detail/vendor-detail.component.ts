import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

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
  authenticatedUser: User;

  constructor(private vendorSvc: VendorService,
              private productSvc: ProductService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
    this.authenticatedUser = this.sysSvc.data.user.instance;
    this.route.params.subscribe(params => this.vendorIdStr = params['id']);
    this.vendorSvc.get(this.vendorIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendor = this.jr.data as Vendor;
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
        this.router.navigate(['/vendor/list']);
        alert('Vendor deleted succesfuly');
      }
    )
  }
}
