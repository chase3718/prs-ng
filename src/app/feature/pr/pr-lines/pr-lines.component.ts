import { Component, OnInit } from '@angular/core';
import { PurchaseRequest } from 'src/app/model/purchase-request.class';
import { PurchaseRequestLineItem } from 'src/app/model/purchase-request-line-item.class';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestService } from 'src/app/service/purchase-request.service';
import { PurchaseRequestLineItemService } from 'src/app/service/purchase-request-line-item.service';
import { JsonResponse } from 'src/app/model/json-response.class';
import { SystemService } from 'src/app/service/system.service';

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
  title = 'Purchase Request Line Items';
  sortColumn: string = 'name';
  sortOrder: string = 'asc';

  constructor(private purchaseRequestSvc: PurchaseRequestService,
              private sysSvc: SystemService,
              private prliSvc: PurchaseRequestLineItemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.sysSvc.data.user.loggedIn) {
      this.router.navigate(['user/login']);
    }
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
        this.router.navigate(['/reroute/' + this.purchaseRequestIdStr]);
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
        } else {
          console.log(this.jr.errors);
          alert('Failed to create purchase request');
        }
      }
    )
  }

  reopen() {
    this.purchaseRequestSvc.reopen(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          console.log('gud');
          location.reload();
        } else {
          console.log(this.jr.errors);
          alert('Could not reopen this purchase request');
        }
      }
    )
  }

  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
      console.log(`sortBy(${col}), order(${this.sortOrder})`);
    }
    this.sortColumn = col;
  }
}
