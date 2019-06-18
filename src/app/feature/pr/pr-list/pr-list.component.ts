import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { JsonResponse } from 'src/app/model/json-response.class';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  jr: JsonResponse;
  prs: PurchaseRequest[];
  title: string = 'PurchaseRequest List';

  constructor(private prSvc: PurchaseRequestService) { }

  ngOnInit() {
    this.prSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prs = this.jr.data as PurchaseRequest[];
          console.log(jresp);
        } else {
          console.log(jresp.errors);
        }
      }
    );
  }


}
