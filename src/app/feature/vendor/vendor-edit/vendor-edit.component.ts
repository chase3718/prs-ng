import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  jr: JsonResponse;
  vendorIdStr: string;
  vendor: Vendor;
  title: string = 'Vendor Edit';
  authenticatedUser: User;

  constructor(private vendorSvc: VendorService,
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
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
  }

  edit() {
    this.vendorSvc.update(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/vendor/list']);
          alert('Vendor Updated succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to update vendor');
        }
      }
    )
  }
}
