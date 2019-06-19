import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { PurchaseRequestLineItemService } from 'src/app/service/purchase-request-line-item.service';
import { JsonResponse } from 'src/app/model/json-response.class';

@Component({
  selector: 'app-pr-lines',
  templateUrl: './pr-lines.component.html',
  styleUrls: ['./pr-lines.component.css']
})
export class PrLinesComponent implements OnInit {
  jr: JsonResponse;
  purchaseRequestIdStr: string;
  pr: PurchaseRequest;
  prlis: PurchaseRequestLineItem[];

  constructor(private purchaseRequestSvc: PurchaseRequestService,
    private prliSvc: PurchaseRequestLineItemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.purchaseRequestIdStr = params['id']);
    this.purchaseRequestSvc.get(this.purchaseRequestIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.pr = this.jr.data as PurchaseRequest;
          console.log(this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );
    this.prliSvc.getFromPurchaseRequest(this.purchaseRequestIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prlis = this.jr.data as PurchaseRequestLineItem[];
          console.log("f", this.jr);
        } else {
          console.log(this.jr.errors);
        }
      }
    );

  }

  remove(id: number) {
    this.prliSvc.delete(id).subscribe(
      jresp => {
        this.jr = jresp;
        console.log('gud');
        location.reload();
        alert('Line Item Deleted succesfuly');
      }
    )
  }

  submit() {
    this.purchaseRequestSvc.submitReview(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          this.router.navigate(['/pr/list']);
          alert('Pr created succesfuly');
        } else {
          console.log(this.jr.errors);
          alert('Failed to create pr');
        }
      }
    )
  }

}
