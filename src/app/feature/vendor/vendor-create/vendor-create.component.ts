import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  title: string = 'Vendor Create';
  jr: JsonResponse;
  vendor: Vendor = new Vendor();

  constructor(private vendorSvc: VendorService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn){
      this.router.navigate(['user/login']);
    }
  }

  create() {
    this.vendorSvc.create(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/vendor/list']);
          alert('Vendor created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create vendor');
        }
      }
    )
  }

}
