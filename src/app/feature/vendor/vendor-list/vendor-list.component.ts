import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  jr: JsonResponse;
  vendors: Vendor[];
  title: string = 'Vendor List';

  constructor(private vndSvc: VendorService) { }

  ngOnInit() {
    this.vndSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.vendors = this.jr.data as Vendor[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }


}
