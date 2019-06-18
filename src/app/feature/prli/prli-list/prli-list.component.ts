import { Component, OnInit } from '@angular/core';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';
import { PurchaseRequestLineItemService } from 'src/app/service/purchase-request-line-item.service';
import { JsonResponse } from 'src/app/model/json-response.class';

@Component({
  selector: 'app-pr-list',
  templateUrl: './prli-list.component.html',
  styleUrls: ['./prli-list.component.css']
})
export class PrliListComponent implements OnInit {
  jr: JsonResponse;
  prli: PurchaseRequestLineItem[];
  title: string = 'PurchaseRequestLineItem List';

  constructor(private prSvc: PurchaseRequestLineItemService) { }

  ngOnInit() {
    this.prSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prli = this.jr.data as PurchaseRequestLineItem[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }


}
